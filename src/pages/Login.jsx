import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAuthStore from "../store/authStore"

export default function Login() {

  const navigate = useNavigate()
  const { role } = useParams()

  const login = useAuthStore((state) => state.login)

  const [employeeCode, setEmployeeCode] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const SALESMAN_ROLES = ["BDM", "BDE", "BDM_E", "BDE_E", "CEO","CRM" ]

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setLoading(true)

    const response = await login({ employeeCode, password })

    const roles = response?.user?.roles || []

    const isAdmin = roles.some(r =>
      r.includes("ADMIN") || r.includes("CTO") 
    )

    const isSalesman = roles.some(r =>
      SALESMAN_ROLES.some(sr => r.includes(sr))
    )

    if (isAdmin) {
      navigate("/admin", { replace: true })
    } else if (isSalesman) {
      navigate("/sales", { replace: true })   
    } else {
      alert("Unauthorized role")
    }

  } catch (err) {
    alert("Invalid credentials")
  } finally {
    setLoading(false)
  }
}

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          {role?.toUpperCase()} LOGIN
        </h2>
        

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium">
              User Code
            </label>

            <input
              type="text"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              className="w-full border rounded-md p-2"
               autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-2"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  )
}