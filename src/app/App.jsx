import { Routes, useLocation } from "react-router-dom"
import { appRoutes } from "./routes"
import { Suspense } from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AuthInitializer from "../components/AuthInitializer"
import GlobalLoader from "../components/GlobalLoader"

export default function App() {
  const location = useLocation()

  const hideNavbar =
  location.pathname.startsWith("/admin") ||
  location.pathname.startsWith("/sales")

const hideFooter =
  location.pathname.startsWith("/login") ||
  location.pathname.startsWith("/admin") ||
  location.pathname.startsWith("/sales")

  return (
    <AuthInitializer>
      <GlobalLoader />

      {!hideNavbar && <Navbar />}

      {/* 🔥 ADD SUSPENSE HERE */}
      <Suspense
        fallback={
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        }
      >
        <Routes>{appRoutes}</Routes>
      </Suspense>

      {!hideFooter && <Footer />}
    </AuthInitializer>
  )
}