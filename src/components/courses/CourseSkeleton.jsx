export default function CourseSkeleton() {
  return (
    <div className="
    min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%]
    rounded-2xl overflow-hidden
    bg-white/60 backdrop-blur-lg
    border border-gray-200
    animate-pulse
    ">
      <div className="h-44 sm:h-48 bg-gray-200" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded-lg mt-3" />
      </div>
    </div>
  )
}