import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getCourseById, updateCourse } from "../../services/courseService"
import ImageUploader from "../../components/ImageUploader"
import { uploadPdfToCloudinary, uploadVideoToCloudinary } from "../../services/uploadService"
export default function EditCourse() {

  const { id } = useParams()
  const navigate = useNavigate()

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

  const [loading, setLoading] = useState(true)

  
  // ✅ FETCH
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
          discountPrice: data.discountPrice ?? 0,
          videoUrl: data.videoUrl || "",
          pdfUrl: data.pdfUrl || "",
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

  //video
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

  // ✅ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateCourse(id, {
        ...form,
        joiningFee: Number(form.joiningFee),
        subscriptionFee: Number(form.subscriptionFee),
        discountPrice: Number(form.discountPrice)
      })

      toast.success("Course updated successfully")
      navigate("/admin/courses")
    } catch {
      toast.error("Update failed")
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 flex justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-[var(--card)] p-6 rounded-2xl shadow"
      >
        <h2 className="text-xl font-bold">Edit Course</h2>

        <input
          type="text"
          placeholder="Course Name"
          value={form.courseName}
          onChange={(e) =>
            setForm({ ...form, courseName: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Class"
          value={form.courseClass}
          onChange={(e) =>
            setForm({ ...form, courseClass: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="number"
          placeholder="Joining Fee"
          value={form.joiningFee}
          onChange={(e) =>
            setForm({ ...form, joiningFee: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="number"
          placeholder="Subscription Fee"
          value={form.subscriptionFee}
          onChange={(e) =>
            setForm({ ...form, subscriptionFee: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="number"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={(e) =>
            setForm({ ...form, discountPrice: e.target.value })
          }
          className="w-full p-3 border rounded-xl"
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

{/* 📄 PDF */}
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

  {/* ✅ PREVIEW */}
  {form.pdfUrl && (
    <iframe
      src={form.pdfUrl}
      className="w-full h-64 mt-3 rounded-xl border"
      title="PDF Preview"
    />
  )}
</div>

        {form.image && (
          <img src={form.image} className="h-32 rounded-xl object-cover" />
        )}

        <ImageUploader
          value={form.image}
          onChange={(url) =>
            setForm({ ...form, image: url })
          }
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="px-4 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl">
            Update
          </button>
        </div>

      </form>
    </div>
  )
}