import { useEffect, useState } from "react"
import {
  getEnabledUsers,
  getDisabledUsers,
} from "../../services/userService"
import UserGrid from "./UserGrid"

export default function UsersPage() {

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const [mode, setMode] = useState("enabled") // 🔥 NEW
  const [page, setPage] = useState(0) // 🔥 PAGINATION

  // ✅ FETCH BASED ON MODE
  const fetchUsers = async () => {
    setLoading(true)

    try {
      let res = []

      if (mode === "enabled") {
        res = await getEnabledUsers(page)
      } else {
        res = await getDisabledUsers(page)
      }

      setUsers(res)
      setFilteredUsers(res)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [mode, page])

  // ✅ SEARCH FILTER
  useEffect(() => {
    const result = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredUsers(result)
  }, [search, users])

  // ✅ UPDATE LOCAL STATE
 const handleUpdate = (updatedUser) => {
  if (!updatedUser) {
    fetchUsers() // fallback
    return
  }

  setUsers((prev) =>
    prev
      .map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      )
      // 🔥 REMOVE FROM LIST IF MODE CHANGED
      .filter((u) =>
        mode === "enabled" ? u.active : !u.active
      )
  )
}

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 card animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  return (
  <div className="space-y-6">

    {/* 🔥 HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <h1 className="text-2xl font-bold">
          User Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage enabled and disabled users
        </p>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full sm:w-64"
        />

        {/* 🔥 MODERN TOGGLE */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full w-fit">

          <button
            onClick={() => {
              setMode("enabled")
              setPage(0)
            }}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              mode === "enabled"
                ? "bg-white shadow text-green-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Enabled
          </button>

          <button
            onClick={() => {
              setMode("disabled")
              setPage(0)
            }}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              mode === "disabled"
                ? "bg-white shadow text-red-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            Disabled
          </button>

        </div>

      </div>
    </div>

    {/* ✅ GRID */}
    <UserGrid users={filteredUsers} onUpdate={handleUpdate} />

    {/* ❌ EMPTY STATE */}
    {filteredUsers.length === 0 && (
      <div className="text-center py-16 bg-white rounded-xl border">
        <p className="text-gray-400 text-sm">
          No users found
        </p>
      </div>
    )}

    {/* 🔥 PAGINATION */}
    <div className="flex justify-between items-center">

      <button
        disabled={page === 0}
        onClick={() => setPage((p) => p - 1)}
        className="btn disabled:opacity-50"
      >
        ← Prev
      </button>

      <span className="text-sm text-gray-500">
        Page {page + 1}
      </span>

      <button
        onClick={() => setPage((p) => p + 1)}
        className="btn btn-primary"
      >
        Next →
      </button>

    </div>

  </div>
)
}