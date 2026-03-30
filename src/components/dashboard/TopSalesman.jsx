import { useState } from "react"

export default function TopSalesman({ data }) {
  const [page, setPage] = useState(0)

  const pageSize = 5
  const start = page * pageSize
  const paginated = data?.slice(start, start + pageSize)

  return (
    <div className="bg-white card p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Salesman</h2>

      <div className="space-y-3">
  {paginated?.map((s, i) => (
    <div
      key={i}
      className="
        flex justify-between card items-center
        p-4 rounded-xl
        border border-gray-200
        hover:shadow-md transition
        bg-white
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-indigo-500">
          #{start + i + 1}
        </span>
        <span className="font-medium ">
          {s.employeeCode}
        </span>
      </div>

      <div className="text-xs  text-right">
        <div>Total: {s.totalSales}</div>
        <div>Monthly: {s.monthlySales}</div>
      </div>
    </div>
  ))}
</div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className=" card px-3 py-1 bg-gray-200  rounded"
        >
          Prev
        </button>

        <button
          disabled={(page + 1) * pageSize >= data?.length}
          onClick={() => setPage((p) => p + 1)}
          className="card px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}