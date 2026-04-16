import { useState } from "react"
import toast from "react-hot-toast"
import { createCourse } from "../../services/courseService"
import ImageUploader from "../../components/ImageUploader"
import { uploadPdfToCloudinary, uploadVideoToCloudinary } from "../../services/uploadService"

export default function CreateCourseModal({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    courseName: "",
    title: "",
    courseClass: "",
    joiningFee: "",
    subscriptionFee: "",
    discountPrice: "",
    videoUrl: "",
    pdfUrl: "",
    image: "",
    enabled: true,
    completed: false
  })

  // ✅ PDF UPLOAD
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const url = await uploadPdfToCloudinary(file)
      setForm(prev => ({ ...prev, pdfUrl: url }))
      toast.success("PDF uploaded")
    } catch {
      toast.error("PDF upload failed")
    }
  }

  const handleVideoUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  // ✅ 700MB LIMIT
  if (file.size > 700 * 1024 * 1024) {
    toast.error("Max 700MB video allowed")
    return
  }

  try {
    const url = await uploadVideoToCloudinary(file)

    console.log("UPLOADED VIDEO URL:", url) // ✅ DEBUG

    setForm(prev => ({ ...prev, videoUrl: url }))
    toast.success("Video uploaded")
  } catch (err) {
    console.error(err)
    toast.error("Video upload failed")
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createCourse({
        ...form,
        joiningFee: Number(form.joiningFee),
        subscriptionFee: Number(form.subscriptionFee),
        discountPrice: Number(form.discountPrice)
      })

      toast.success("Course created")
      onClose()
      onSuccess()
    } catch {
      toast.error("Failed")
    }
  }

  return (
    <div className="
      fixed inset-0 
      bg-black/50 
      flex justify-center items-center 
      p-4 
      z-50
    ">

      {/* MODAL BOX */}
      <div className="
        w-full 
        max-w-lg 
        max-h-[90vh]   /* ✅ LIMIT HEIGHT */
        bg-[var(--card)] 
        rounded-2xl 
        shadow-lg
        flex flex-col
      ">

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">Create Course</h2>
        </div>

        {/* SCROLLABLE BODY */}
        <form
          onSubmit={handleSubmit}
          className="
            flex-1 
            overflow-y-auto   /* ✅ SCROLL ENABLE */
            p-5 
            space-y-4
          "
        >

          <ImageUploader
            value={form.image}
            onChange={(url) =>
              setForm({ ...form, image: url })
            }
          />

          <input
            placeholder="Course Name"
            className="input w-full"
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
          />

          <input
            placeholder="Class"
            className="input w-full"
            onChange={(e) => setForm({ ...form, courseClass: e.target.value })}
          />

          <input
            placeholder="Course Title"
            className="input w-full"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="number"
            placeholder="Joining Fee"
            className="input w-full"
            onChange={(e) => setForm({ ...form, joiningFee: e.target.value })}
          />

          <input
            type="number"
            placeholder="Subscription Fee"
            className="input w-full"
            onChange={(e) => setForm({ ...form, subscriptionFee: e.target.value })}
          />

          <input
            type="number"
            placeholder="Discount Price"
            className="input w-full"
            onChange={(e) => setForm({ ...form, discountPrice: e.target.value })}
          />

          


{/* 🎥 VIDEO UPLOAD */}
<div>
  <label className="block text-sm font-medium mb-1">
    Upload Video
  </label>

  <input
    type="file"
    accept="video/*"
    id="videoUpload"
    hidden
    onChange={handleVideoUpload}
  />

  <label
    htmlFor="videoUpload"
    className="block w-full p-3 border rounded-xl cursor-pointer text-center hover:bg-gray-50"
  >
    Choose Video File
  </label>

  {form.videoUrl && (
    <video
      controls
      className="w-full rounded-xl mt-2"
    >
      <source src={form.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</div>

{/* 📄 PDF UPLOAD */}
<div>
  <label className="block text-sm mb-1">Upload PDF</label>

  <input
    type="file"
    accept="application/pdf"
    id="pdfUpload"
    hidden
    onChange={handlePdfUpload}
  />

  <label
    htmlFor="pdfUpload"
    className="block w-full p-3 border rounded-xl text-center cursor-pointer"
  >
    Choose PDF File
  </label>

  {/* ✅ INLINE PDF PREVIEW */}
  {form.pdfUrl && (
    <iframe
      src={form.pdfUrl}
      className="w-full h-64 mt-3 rounded-xl border"
      title="PDF Preview"
    />
  )}
</div>

        </form>

        {/* FOOTER BUTTONS */}
        <div className="p-5 border-t flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}