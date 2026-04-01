import { useEffect, useState } from "react"
import API from "../../api/api"

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ FIXED: FETCH ROLES USING AXIOS INSTANCE
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await API.get("/api/v1/roles")   // ✅ FIX
        const data = res.data                        // ✅ FIX

        setRoles(data)

        if (data.length > 0) {
          setForm((prev) => ({ ...prev, role: data[0] }))
        }
      } catch (err) {
        console.error("Failed to load roles", err)
      }
    }

    fetchRoles()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    await onSubmit({
      name: form.name,
      email: form.email,
      password: form.password,
      roles: [form.role],
    })

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 ">

      {/* NAME */}
      <div>
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="input mt-1 w-full"
          required
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          autoComplete="new-email"
          className="input mt-1 w-full"
          required
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
          className="input mt-1 w-full"
          required
        />
      </div>

      {/* ROLE */}
      <div>
        <label className="text-sm font-medium text-gray-700">Role</label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {roles.length === 0 ? (
            <option>Loading roles...</option>
          ) : (
            roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))
          )}
        </select>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>

    </form>
  )
}