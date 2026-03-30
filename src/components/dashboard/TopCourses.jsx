export default function TopCourses({ courses }) {
  return (
    <div className="bg-white card p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Courses</h2>

      {courses?.map((c, i) => (
        <div
          key={i}
          className="flex justify-between py-2 border-b last:border-none"
        >
          <span>{c.courseName}</span>
          <span className="font-semibold">{c.totalSales}</span>
        </div>
      ))}
    </div>
  )
}