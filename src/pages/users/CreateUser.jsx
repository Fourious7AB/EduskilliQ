import { useNavigate } from "react-router-dom"
import UserForm from "./UserForm"

import toast from "react-hot-toast"
import { registerUser } from "../../services/userService"

export default function CreateUser() {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      await registerUser(formData)

      toast.success("User created successfully 🚀")

      navigate("/admin/users")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user")
    }
  }

  return (
    <div className="p-6 ">
      <div className="max-w-3xl mx-auto card p-6">
        
        <h2 className="text-xl font-semibold mb-1 text-[var(--text)]">Create New User</h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Add a new user to your platform with roles and credentials.
        </p>

        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}