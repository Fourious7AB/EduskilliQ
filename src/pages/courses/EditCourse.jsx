import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getCourseById, updateCourse } from "../../services/courseService"
import ImageUploader from "../../components/ImageUploader"

export default function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    courseName: "",
     title: "",
    courseClass: "",
    joiningFee: "",
    subscriptionFee: "",
    image: "", 
    enabled: true,
    completed: false
  })

  const [loading, setLoading] = useState(true)

  // ✅ FETCH SINGLE COURSE (FIXED)
 useEffect(() => {
  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id)

      setForm({
        courseName: data.courseName || "",
        title: data.title || "",
        courseClass: data.courseClass || "",
        joiningFee: data.joiningFee ?? 0,
        subscriptionFee: data.subscriptionFee ?? 0,
        enabled: data.enabled ?? true,
        completed: data.completed ?? false,
        image: data.image || ""
      })

    } catch {
      toast.error("Failed to load course")
    } finally {
      setLoading(false)
    }
  }

  fetchCourse()
}, [id])

  // ✅ UPDATE COURSE
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateCourse(id, {
  ...form,
  image: form.image
})
      toast.success("Course updated successfully")
      navigate("/admin/courses")
    } catch {
      toast.error("Update failed")
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6 flex justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-[var(--card)] p-6 rounded-2xl shadow"
      >
        <h2 className="text-xl font-bold">Edit Course</h2>

        {/* COURSE NAME */}
        <input
          type="text"
          placeholder="Course Name"
          value={form.courseName}
          onChange={(e) =>
            setForm({ ...form, courseName: e.target.value })
          }
          className="w-full p-3 border rounded-xl bg-transparent"
        />
        {/* TITLE */}
<input
  type="text"
  placeholder="Course Title"
  value={form.title || ""}
  onChange={(e) =>
    setForm({ ...form, title: e.target.value })
  }
  className="w-full p-3 border rounded-xl bg-transparent"
/>

        {/* CLASS */}
        <input
          type="text"
          placeholder="Course Class"
          value={form.courseClass}
          onChange={(e) =>
            setForm({ ...form, courseClass: e.target.value })
          }
          className="w-full p-3 border rounded-xl bg-transparent"
        />

        {/* JOINING FEE */}
        <input
          type="number"
          placeholder="Joining Fee"
          value={form.joiningFee}
          onChange={(e) =>
            setForm({ ...form, joiningFee: e.target.value })
          }
          className="w-full p-3 border rounded-xl bg-transparent"
        />

        {/* SUBSCRIPTION FEE */}
        <input
          type="number"
          placeholder="Subscription Fee"
          value={form.subscriptionFee}
          onChange={(e) =>
            setForm({ ...form, subscriptionFee: e.target.value })
          }
          className="w-full p-3 border rounded-xl bg-transparent"
        />

        {/* STATUS TOGGLES */}
        <div className="flex justify-between text-sm">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) =>
                setForm({ ...form, enabled: e.target.checked })
              }
            />
            Enabled
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) =>
                setForm({ ...form, completed: e.target.checked })
              }
            />
            Completed
          </label>

        </div>
        {/* EXISTING IMAGE */}
{form.image && (
  <img src={form.image} className="h-32 rounded-xl object-cover" />
)}

{/* UPLOAD */}
<ImageUploader
  value={form.image}
  onChange={(url) =>
    setForm({ ...form, image: url })
  }
/>

        {/* ACTIONS */}
        <div className="flex justify-between">

          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl hover:opacity-90">
            Update
          </button>

        </div>

      </form>
    </div>
  )
}