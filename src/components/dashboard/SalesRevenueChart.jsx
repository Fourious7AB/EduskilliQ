import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function SalesRevenueChart({ data }) {
  return (
    <div className="bg-white card p-6 rounded-2xl card shadow border dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">Sales vs Revenue</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
<XAxis dataKey="label" stroke="#9ca3af" />
<YAxis stroke="#9ca3af" />
<Tooltip />

          <Line
  type="monotone"
  dataKey="revenue"
  stroke="var(--primary)"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

<Line
  type="monotone"
  dataKey="sales"
  stroke="#60a5fa"
  strokeWidth={3}
  dot={{ r: 4 }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}