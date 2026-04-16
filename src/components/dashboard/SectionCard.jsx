export default function SectionCard({ title, children }) {
  return (
    <div className="
      bg-white 
      border border-gray-200
      rounded-2xl 
      p-4 sm:p-6
      shadow-sm 
      hover:shadow-md 
      transition
      w-full
    ">
      
      {/* TITLE */}
      <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
        {title}
      </h2>

      {/* RESPONSIVE GRID */}
      <div className="
        grid 
        gap-3 sm:gap-4
        grid-cols-1 
        sm:grid-cols-2 
        xl:grid-cols-2
      ">
        {children}
      </div>

    </div>
  )
}