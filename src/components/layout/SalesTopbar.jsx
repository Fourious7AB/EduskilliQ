// src/components/layout/Topbar.jsx
import { Menu, Bell, Moon, Sun } from "lucide-react"
import { useState } from "react"
import useThemeStore from "../../store/themeStore"
import useAuthStore from "../../store/authStore"
import { useNavigate } from "react-router-dom"

export default function SalesTopbar({ setSidebarOpen }) {

  const [open, setOpen] = useState(false)

  const { theme, toggleTheme } = useThemeStore()
  

  const { user, logout } = useAuthStore()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login/admin") // redirect after logout
  }

  return (
    <header className="topbar sticky top-0 z-50 h-16 flex items-center justify-between px-4 md:px-6 bg-white">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        

        <h2 className="font-semibold text-lg">Salesman Panel</h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-12 relative">

        {/* DARK MODE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 card transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        

        {/* ACCOUNT */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-[var(--primary-soft)] px-3 py-1 rounded-full"
        >
         <img
  src={
    user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Admin")}`
  }
  alt="avatar"
  className="w-7 h-7 rounded-full object-cover"
/>

<span className="text-sm hidden md:block">
  {user?.name || "Admin"}
</span>
        </button>

        {/* DROPDOWN */}
        {open && (
  <>
    {/* BACKDROP (click outside to close) */}
    <div
      className="fixed inset-0 z-40"
      onClick={() => setOpen(false)}
    />

    {/* DROPDOWN */}
    <div className="absolute right-0 top-14 w-52 z-50 animate-fade-in">
      <div className="card rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--card)] backdrop-blur-xl">

        {/* USER INFO SECTION */}
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--text)] truncate">
            {user?.name || "Admin User"}
          </p>
          <p className="text-xs text-[var(--muted)] truncate">
            {user?.email || "admin@system.com"}
          </p>
        </div>

        {/* MENU ITEMS */}
        <div className="p-2 flex flex-col gap-1">

          {/* <button
            onClick={() => {
              setOpen(false)
              navigate("/profile")
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--primary-soft)] transition"
          >
            👤 Profile
          </button>

          <button
            onClick={() => {
              setOpen(false)
              navigate("/settings")
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--primary-soft)] transition"
          >
            ⚙️ Settings
          </button> */}

          {/* DIVIDER */}
          <div className="h-px bg-[var(--border)] my-1" />

          {/* LOGOUT i gave # bcz it look mor profastional*/}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
          >
            # Logout 
          </button>

        </div>
      </div>
    </div>
  </>
)}

      </div>
    </header>
  )
}