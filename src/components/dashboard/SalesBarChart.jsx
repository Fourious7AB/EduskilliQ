import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function SalesBarChart({ data }) {
  return (
    <div className="bg-white card p-6 rounded-2xl shadow border dark:border-gray-700">

      <h2 className="text-lg font-semibold mb-4">
        Sales Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
<XAxis dataKey="label" stroke="#9ca3af" />
<YAxis stroke="#9ca3af" />
<Tooltip />

         <Bar
  dataKey="sales"
  fill="var(--primary)"
  radius={[10, 10, 0, 0]}
/>
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}