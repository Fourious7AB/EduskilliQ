import { useEffect, useRef } from "react"
import DashboardContent from "../../components/dashboard/DashboardContent"
import useThemeStore from "../../store/themeStore" // ✅ ADD THIS

export default function AdminDashboard() {

  

  const theme = useThemeStore((state) => state.theme) // ✅ FIX

  

  return (
      <div className="p-4">
        <DashboardContent />
      </div>
    
  )
}