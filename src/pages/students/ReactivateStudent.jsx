import { useState } from "react"
import { reactivateStudent } from "../../services/studentService"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ReactivateStudent() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!code.trim()) {
      setError("Student code is required")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setMessage(null)

      const res = await reactivateStudent(code)

      setMessage(res)
      setCode("")
    } catch (err) {
      setError("Failed to reactivate student")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Reactivate Student
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Enter student code to activate account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium mb-1 block">
              Student Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. STD-12345"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              "Reactivate Student"
            )}
          </button>
        </form>

        {/* SUCCESS */}
        {message && (
          <div className="mt-4 flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
            <XCircle size={18} />
            {error}
          </div>
        )}
      </div>
    </div>
  )
}