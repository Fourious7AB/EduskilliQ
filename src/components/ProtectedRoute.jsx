import { Navigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

export default function ProtectedRoute({
  children,
  allowedRoles = [],   // ✅ dynamic roles
  redirectTo = "/login/admin" // ✅ customizable redirect
}) {
  const { isAuthenticated, user, isHydrated } = useAuthStore()

  // ⏳ Wait for Zustand persist
  if (!isHydrated) {
    return <div className="p-4">Loading...</div>
  }

  // 🔒 Not logged in
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // 🎯 Role check (if roles provided)
  if (allowedRoles.length > 0) {
    const userRoles = user?.roles || []

    const hasAccess = userRoles.some(role =>
      allowedRoles.some(ar => role.includes(ar))
    )

    if (!hasAccess) {
      return <Navigate to="/" replace />
    }
  }

  return children
}