import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Users,
  UserCog,
  ShieldCheck,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap
} from "lucide-react"

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()
  const [usersOpen, setUsersOpen] = useState(false)
  const [studentOpen, setStudentOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.includes("/admin/users")) {
      setUsersOpen(true)
    }
  }, [location])

  useEffect(() => {
  if (location.pathname.includes("/admin/students")) {
    setStudentOpen(true)
  }
}, [location])

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:relative z-50
          w-64 md:w-72 h-full
          backdrop-blur-xl
          border-r
          transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{
          background: "color-mix(in srgb, var(--card) 85%, transparent)",
          borderColor: "var(--border)"
        }}
      >

        {/* HEADER */}
        <div
          className="p-5 flex items-center justify-between border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <h1 className="font-bold text-lg tracking-tight">
              EduskilliQ
            </h1>
            <p className="text-xs text-[var(--muted)]">
              Enterprise Dashboard
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-[var(--muted)] hover:text-[var(--text)] transition"
          >
            <X />
          </button>
        </div>

        {/* NAV */}
        <nav className="p-3 flex flex-col gap-1">

          {/* ✅ Dashboard (with end) */}
          <Link
            to="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            setOpen={setOpen}
            end
          />
          

          {/* USERS DROPDOWN */}
          <button
            onClick={() => setUsersOpen(!usersOpen)}
            className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 text-[var(--muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--text)]"
          >
            <div className="flex items-center gap-3">
              <Users size={18} className="group-hover:scale-110 transition" />
              <span className="font-medium">Users</span>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                usersOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* SUBMENU */}
          <div
            className={`
              overflow-hidden transition-all duration-300
              ${usersOpen ? "max-h-96 mt-2" : "max-h-0"}
            `}
          >
            <div
              className="ml-4 flex flex-col gap-1 border-l pl-3"
              style={{ borderColor: "var(--border)" }}
            >

              {/* ❌ NO end here */}
              <Link
                to="/admin/users"
                icon={<ShieldCheck size={16} />}
                label="Management"
                setOpen={setOpen}
                end 
              />

              <Link
                to="/admin/users/create"
                icon={<UserCog size={16} />}
                label="Add User"
                setOpen={setOpen}
                end 
              />

            </div>
          </div>
          <Link
  to="/admin/courses"
  icon={<BookOpen size={18} />}
  label="Courses"
  setOpen={setOpen}
  end
/>

{/* STUDENTS DROPDOWN */}
<button
  onClick={() => setStudentOpen(!studentOpen)}
  className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 text-[var(--muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--text)]"
>
  <div className="flex items-center gap-3">
    <GraduationCap size={18} className="group-hover:scale-110 transition" />
    <span className="font-medium">Students</span>
  </div>

  <ChevronDown
    size={16}
    className={`transition-transform duration-300 ${
      studentOpen ? "rotate-180" : ""
    }`}
  />
</button>

{/* SUBMENU */}
<div
  className={`overflow-hidden transition-all duration-300 ${
    studentOpen ? "max-h-40 mt-2" : "max-h-0"
  }`}
>
  <div
    className="ml-4 flex flex-col gap-1 border-l pl-3"
    style={{ borderColor: "var(--border)" }}
  >
    <Link
      to="/admin/students/reactivate"
      icon={<ShieldCheck size={16} />}
      label="Reactivate Student"
      setOpen={setOpen}
      end
    />
  </div>
</div>

        </nav>
      </aside>
    </>
  )
}

/* ✅ FINAL LINK COMPONENT */
function Link({ to, icon, label, setOpen, end = false }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          onClick={() => {
            // ✅ ALWAYS CLOSE SIDEBAR (best UX)
            setOpen(false)
          }}
          className={`
            relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
            transition-all duration-200 cursor-pointer
            ${
              isActive
                ? "bg-[var(--primary-soft)] text-[var(--primary)]"
                : "text-[var(--muted)] hover:bg-[var(--primary-soft)] hover:text-[var(--text)]"
            }
          `}
        >
          {/* ACTIVE INDICATOR */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r bg-[var(--primary)]" />
          )}

          {icon}

          <span className="font-medium tracking-tight">
            {label}
          </span>
        </div>
      )}
    </NavLink>
  )
}