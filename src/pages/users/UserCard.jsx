import { useNavigate } from "react-router-dom"

export default function UserCard({ user }) {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/admin/users/${user.id}`)}
      className="card p-5 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all shadow-sm hover:shadow-xl"
    >

      <div className="flex items-center gap-4">

        <img
          src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
          className="w-12 h-12 rounded-full border"
        />

        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-xs text-[var(--muted)]">{user.employeeCode}</p>
        </div>

      </div>

      <div className="mt-4 flex justify-between items-center">

        {/* ROLE */}
        <span className="text-xs px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
          {user.roles && user.roles.length > 0
            ? user.roles.map((role, index) => {
                const match = role.match(/name=([^)]+)/)
                return (
                  <span key={index}>
                    {match ? match[1] : role}
                    {index !== user.roles.length - 1 && ", "}
                  </span>
                )
              })
            : "User"}
        </span>

        {/* ✅ STATUS BADGE */}
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            user.enable
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.enable ? "Active" : "Disabled"}
        </span>

      </div>
    </div>
  )
}