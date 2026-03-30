import { useState } from "react"
import { Outlet } from "react-router-dom"
import Topbar from "./Topbar"
import Sidebar from "./Sidebar"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}