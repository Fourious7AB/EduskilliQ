import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById, updateUser } from "../../services/userService"
import useAuthStore from "../../store/authStore"
import toast from "react-hot-toast"
import ImageUploader from "../../components/ImageUploader"

export default function UpdateUser() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const logout = useAuthStore((state) => state.logout)

  // ✅ UPDATED FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    enable: true,
    password: "",
  })

  const [loading, setLoading] = useState(true)

  // ✅ LOAD FULL USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(userId)

        setForm({
          name: data.name || "",
          email: data.email || "",
          image: data.image || "",
          enable: data.enable ?? true,
        })
      } catch {
        toast.error("Failed to load user")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [userId])

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    // handle boolean for enable
    if (name === "enable") {
      setForm({
        ...form,
        enable: value === "true",
      })
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }
  }

  // ✅ SUBMIT (FIX 401 ISSUE)
  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const payload = { ...form }

    // ❌ REMOVE password if empty
    if (!payload.password) {
      delete payload.password
    }

    await updateUser(userId, payload)

    toast.success("User Updated Successfully", {
      position: "top-center",
    })

    navigate(`/admin/users/${userId}`)

  } catch {
    toast.error("Update failed")
  }
}
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  return (
    <div className="max-w-xl mx-auto card p-6 space-y-4">

      <h2 className="text-xl font-bold">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input w-full"
        />
        {/* PASSWORD */}
<input
  type="password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="New Password (leave blank to keep old)"
  className="input w-full"
/>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input w-full"
        />

        {/* IMAGE */}
       <ImageUploader
  value={form.image}
  onChange={(url) =>
    setForm((prev) => ({
      ...prev,
      image: url,
    }))
  }
/>

        {/* ENABLE / DISABLE */}
        <select
          name="enable"
          value={form.enable}
          onChange={handleChange}
          className="input w-full"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>

        <button className="btn btn-primary w-full">
          Update User
        </button>

      </form>
    </div>
  )
}