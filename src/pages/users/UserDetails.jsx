import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  getUserById,
  deleteUser,
  
} from "../../services/userService"
import { getSalesHistory } from "../../services/salesService"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import toast from "react-hot-toast"

export default function UserDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [sales, setSales] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(false)

  // ✅ FETCH
 const fetchData = async () => {
  try {
    // ✅ DOUBLE SAFETY (important in real apps)
    if (!userId || userId === "create") return

    setLoading(true)

    const userData = await getUserById(userId)
    setUser(userData)

    if (!userData?.employeeCode) return

    const salesRes = await getSalesHistory(userData.employeeCode, page)

    const salesList = salesRes.content || []
    setSales(salesList)

    setHasNext(!salesRes.last)

    const totalAmount = salesList.reduce(
      (sum, item) => sum + item.amount,
      0
    )
    setTotal(totalAmount)

  } catch (err) {
    console.error(err)
    toast.error("Failed to load data")
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
  // ✅ PREVENT WRONG API CALL
  if (!userId || userId === "create") return

  fetchData()
}, [userId, page])
  
  // ✅ DELETE
  const handleDelete = async () => {
  if (!confirm("Delete this user?")) return

  try {
    await deleteUser(user.id)   // ✅ FIXED
    toast.success("User Deleted")
    navigate("/admin/users")
  } catch (err) {
    toast.error("Delete failed")
  }
}

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!user) {
    return <div className="p-10 text-center">User not found</div>
  }

  return (
    <div className="space-y-6">

      {/* 🔥 TOP CARD */}
      <div className="card p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md rounded-2xl">

  {/* LEFT */}
  <div className="flex items-center gap-4">
    <img
      src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
      className="w-20 h-20 rounded-full object-cover border"
    />

    <div>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500 text-sm">{user.employeeCode}</p>

      {/* STATUS BADGE */}
      <div
        className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          user.active
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {user.active ? "Active" : "Disabled"}
      </div>
    </div>
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex gap-3">
    <button
      onClick={handleDelete}
      className="px-4 py-2 rounded-xl bg-red-400 hover:bg-red-600 text-white hover:opacity-90"
    >
      Delete
    </button>

    <button
      onClick={() => navigate(`/admin/users/${user.id}/edit`)}
      className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
    >
      Edit Profile
    </button>
  </div>
</div>

      {/* 📊 CHART */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Sales Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sales}>
            <XAxis
              dataKey="saleDate"
              tickFormatter={(d) => new Date(d).getDate()}
            />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 TABLE */}
      <div className="card p-6">

        <h3 className="font-semibold mb-4">Sales History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((s, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2">{s.studentName}</td>
                  <td>{s.studentEmail}</td>
                  <td>{s.courseName}</td>
                  <td className="font-semibold">₹{s.amount}</td>
                  <td>{new Date(s.saleDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {sales.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              No sales found
            </div>
          )}
        </div>

        {/* 🔥 PAGINATION */}
        <div className="flex justify-between mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="btn disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">Page {page + 1}</span>

          <button
            disabled={!hasNext}
            onClick={() => setPage((p) => p + 1)}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>

      {/* 💰 TOTAL */}
      <div className="card p-6 flex justify-between">
        <span>Total Sales</span>
        <span className="text-2xl font-bold text-green-600">
          ₹{total}
        </span>
      </div>

    </div>
  )
}