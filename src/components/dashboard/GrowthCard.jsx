export default function GrowthCard({ title, value }) {
  const isPositive = value >= 0

  return (
    <div className="
      p-6 rounded-2xl
      bg-gradient-to-br card from-white to-gray-50
      border border-gray-200
      shadow-sm
    ">
      <p className="text-sm ">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${
        isPositive ? "text-green-600" : "text-red-500"
      }`}>
        {(value ?? 0).toFixed(1)}%
      </h2>
    </div>
  )
}