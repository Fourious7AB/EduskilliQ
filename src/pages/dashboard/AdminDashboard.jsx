import { useEffect, useRef } from "react"
import DashboardContent from "../../components/dashboard/DashboardContent"
import useThemeStore from "../../store/themeStore" // ✅ ADD THIS

export default function AdminDashboard() {

  const hasMounted = useRef(false)

  const theme = useThemeStore((state) => state.theme) // ✅ FIX

  useEffect(() => {
    if (hasMounted.current) return
    hasMounted.current = true
  }, [])

  return (
      <div className="p-4">
        <DashboardContent />
      </div>
    
  )
}