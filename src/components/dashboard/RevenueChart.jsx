import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function RevenueChart({ data, range }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border dark:border-gray-700">

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Revenue Trend</h2>
        <span className="text-sm text-gray-400">{range}</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}