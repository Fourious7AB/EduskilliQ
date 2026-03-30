import { useEffect, useRef, useState } from "react"
import useAuthStore from "../store/authStore"

const TIMEOUT = 15 * 60 * 1000 // 15 min
const WARNING_TIME = 60 * 1000 // 1 min before logout

export default function SessionTimeout() {

  const logout = useAuthStore((s) => s.logout)
  const [showWarning, setShowWarning] = useState(false)

  // ✅ useRef for persistent timers
  const timerRef = useRef(null)
  const warningRef = useRef(null)

  const resetTimer = () => {

    // clear previous timers
    if (timerRef.current) clearTimeout(timerRef.current)
    if (warningRef.current) clearTimeout(warningRef.current)

    setShowWarning(false)

    // show warning before logout
    warningRef.current = setTimeout(() => {
      setShowWarning(true)
    }, TIMEOUT - WARNING_TIME)

    // logout timer
    timerRef.current = setTimeout(async () => {
      await logout()
      window.location.href = "/login/admin"
    }, TIMEOUT)
  }

  useEffect(() => {

    const events = ["click", "mousemove", "keydown"]

    events.forEach((e) => window.addEventListener(e, resetTimer))

    resetTimer()

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer))

      if (timerRef.current) clearTimeout(timerRef.current)
      if (warningRef.current) clearTimeout(warningRef.current)
    }

  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
      Session expiring in 1 minute...
    </div>
  )
}