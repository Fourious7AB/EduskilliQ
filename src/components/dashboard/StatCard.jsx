export function StatCard({ title, value }) {
  return (
    <div className="
      p-5 rounded-xl card
      bg-gray-50
      hover:bg-white
      border border-transparent
      hover:border-gray-200
      transition-all
    ">
      <p className="text-xs  uppercase tracking-wide">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2 ">
        {value ?? 0}
      </h2>
    </div>
  )
}