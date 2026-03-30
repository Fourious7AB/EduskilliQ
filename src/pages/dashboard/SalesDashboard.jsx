import { useEffect, useState } from "react"
import useAuthStore from "../../store/authStore"
import { getSalesHistory } from "../../services/salesService"

export default function SalesDashboard() {
  const { user } = useAuthStore()

  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // ✅ CLEANED (removed revenue)
  const [stats, setStats] = useState({
    totalSales: 0
  })

  useEffect(() => {
    const fetchSales = async () => {
      try {
        if (!user?.employeeCode) {
          setLoading(false)
          return
        }

        setLoading(true)

        const res = await getSalesHistory(user.employeeCode, page)

        const content = res.content || []

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        // ✅ FILTER MONTHLY SALES
        const monthlySales = content.filter(item => {
          const date = new Date(item.saleDate)
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          )
        })

        // ✅ SORT LATEST FIRST
        const sorted = [...monthlySales].sort(
          (a, b) => new Date(b.saleDate) - new Date(a.saleDate)
        )

        setSales(sorted)
        setTotalPages(res.totalPages || 1)

        // ✅ FIXED COUNT LOGIC
        if (page === 0) {
          const totalSales = monthlySales.length
          setStats({ totalSales })
        }

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [user, page])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5">
          <p className="text-sm text-[var(--muted)]">This Month Sales</p>
          <h2 className="text-2xl font-bold">{stats.totalSales}</h2>
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">
          {user?.name || "SalesMan User"} Sales History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2 font-medium">
                    {sale.studentName}
                  </td>
                  <td className="text-[var(--muted)]">
                    {sale.studentEmail}
                  </td>
                  <td>{sale.courseName}</td>
                  <td className="text-xs text-[var(--muted)]">
                    {new Date(sale.saleDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🚀 PAGINATION */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
            className="btn border disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          <span className="text-sm text-[var(--muted)]">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(prev => prev + 1)}
            className="btn border disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>

      </div>
    </div>
  )
}