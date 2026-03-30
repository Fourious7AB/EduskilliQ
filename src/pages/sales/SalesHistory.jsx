import { useEffect, useState } from "react"
import useAuthStore from "../../store/authStore"
import { getSalesHistory } from "../../services/salesService"

export default function SalesHistory() {
  const { user } = useAuthStore()

  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(false)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // ✅ IMPORTANT FIX
        if (!user?.employeeCode) {
          setLoading(false)
          return
        }

        setLoading(true)

        const res = await getSalesHistory(user.employeeCode, page)

        const list = res.content || []

const now = new Date()
const currentMonth = now.getMonth()
const currentYear = now.getFullYear()

const monthlySales = list.filter(item => {
  const date = new Date(item.saleDate)
  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  )
})

setSales(monthlySales)

        setHasNext(!res.last)

        const totalAmount = list.reduce(
          (sum, item) => sum + item.amount,
          0
        )

       

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [user, page])

  if (loading) {
    return <div className="text-center p-10">Loading...</div>
  }

  return (
    <div className="space-y-6">

      {/* 📋 TABLE */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">
          My Sales History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>Student</th>
                <th>Email</th>
                <th>Course</th>
                
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((s, i) => (
                <tr key={i} className="border-b">
                  <td>{s.studentName}</td>
                  <td>{s.studentEmail}</td>
                  <td>{s.courseName}</td>
                  
                  <td>
                    {new Date(s.saleDate).toLocaleString()}
                  </td>
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

          <span>Page {page + 1}</span>

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
        <span>Total (This Page)</span>
        <span className="text-green-600 font-bold">
          ₹{total}
        </span>
      </div>

    </div>
  )
}