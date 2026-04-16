export function StatCard({ title, value }) {
  return (
    <div className="
      w-full
      p-4 sm:p-5 
      rounded-xl 
      bg-gray-50
      hover:bg-white
      border border-gray-100
      hover:border-gray-200
      transition-all
      flex flex-col
      justify-center
      min-h-[90px]
    ">
      
      {/* TITLE */}
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {title}
      </p>

      {/* VALUE */}
      <h2 className="
        text-xl sm:text-2xl 
        font-bold 
        mt-1 sm:mt-2
        break-words
      ">
        {value ?? 0}
      </h2>

    </div>
  )
}