import { useState } from "react"
import toast from "react-hot-toast"
import { createCourse } from "../../services/courseService"
import ImageUploader from "../../components/ImageUploader"

export default function CreateCourseModal({ onClose, onSuccess }) {

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createCourse({
  ...form,
  joiningFee: Number(form.joiningFee),
  subscriptionFee: Number(form.subscriptionFee)
})
      toast.success("Course created")
      onClose()
      onSuccess()
    } catch {
      toast.error("Failed")
    }
  }

  return (
    <div className="  fixed inset-0 bg-black/40 flex justify-center items-center">


      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card)] p-6 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Create Course</h2>
       
    <ImageUploader
  value={form.image}
  onChange={(url) =>
    setForm({ ...form, image: url })
  }
/>

        <input
          placeholder="Course Name"
          className="input"
          onChange={(e) => setForm({ ...form, courseName: e.target.value })}
        />

        <input
          placeholder="Class"
          className="input"
          onChange={(e) => setForm({ ...form, courseClass: e.target.value })}
        />
        <input
  placeholder="Course Title (Premium Heading)"
  className="input"
  onChange={(e) => setForm({ ...form, title: e.target.value })}
/>

        <input
          type="number"
          placeholder="Joining Fee"
          className="input"
          onChange={(e) => setForm({ ...form, joiningFee: e.target.value })}
        />

        <input
          type="number"
          placeholder="Subscription Fee"
          className="input"
          onChange={(e) => setForm({ ...form, subscriptionFee: e.target.value })}
        />

        <div className="flex justify-between">
          <button type="button" onClick={onClose}>Cancel</button>
          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}