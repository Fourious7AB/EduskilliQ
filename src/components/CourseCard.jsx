import { useNavigate } from "react-router-dom"
import { Trash2, Pencil } from "lucide-react"

export default function CourseCard({ course, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="p-5 rounded-2xl border bg-[var(--card)] shadow-sm hover:shadow-md transition">

      <h2 className="text-lg font-semibold">{course.courseName}</h2>
      <p className="text-sm text-[var(--muted)]">
        {course.courseClass}
      </p>

      <div className="mt-3 text-sm">
        <p>Joining: ₹{course.joiningFee}</p>
        <p>Subscription: ₹{course.subscriptionFee}</p>
      </div>

      {/* STATUS */}
      <div className="mt-3 flex gap-2">
        {course.enabled && (
          <span className="text-green-500 text-xs">Active</span>
        )}
        {course.completed && (
          <span className="text-blue-500 text-xs">Completed</span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
          className="text-blue-500"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(course.id)}
          className="text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}