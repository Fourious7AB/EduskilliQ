export default function DashboardFilters({
  courses = [],
  salesmen = [],
  selectedCourse,
  selectedSalesman,
  onCourseChange,
  onSalesmanChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 bg-white card p-4 rounded-xl border dark:border-gray-700">

      {/* Course Filter */}
      <select
        value={selectedCourse}
        onChange={(e) => onCourseChange(e.target.value)}
        className="input"
      >
        <option value="">All Courses</option>
        {courses.map((c, i) => (
          <option key={i} value={c.courseName}>
            {c.courseName}
          </option>
        ))}
      </select>

      {/* Salesman Filter */}
      <select
        value={selectedSalesman}
        onChange={(e) => onSalesmanChange(e.target.value)}
        className="input"
      >
        <option value="">All Salesman</option>
        {salesmen.map((s, i) => (
          <option key={i} value={s.employeeCode}>
            {s.employeeCode}
          </option>
        ))}
      </select>

    </div>
  )
}