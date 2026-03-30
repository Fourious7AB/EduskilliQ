import { useEffect, useState } from "react"
import CreateCourseModal from "./CreateCourseModal"
import toast from "react-hot-toast"
import CourseCard from "../../components/CourseCard"
import { deleteCourse, getCourses } from "../../services/courseService"

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const fetchCourses = async () => {
    try {
      const data = await getCourses()
setCourses(Array.isArray(data) ? data : data.content || [])
    } catch {
      toast.error("Failed to load courses")
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id)
      toast.success("Course deleted")
      fetchCourses()
    } catch {
      toast.error("Delete failed")
    }
  }

  const filtered = courses.filter(c =>
  (c.courseName + " " + (c.title || ""))
    .toLowerCase()
    .includes(search.toLowerCase())
)

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          + Create Course
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border bg-transparent"
      />

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-5">
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <CreateCourseModal
          onClose={() => setOpenModal(false)}
          onSuccess={fetchCourses}
        />
      )}
    </div>
  )
}