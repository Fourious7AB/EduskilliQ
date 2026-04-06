import { useState } from "react"
import { Phone, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import useAuthStore from "../store/authStore"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  // Zustand auth state
  const { isAuthenticated, user } = useAuthStore()

  const isAdmin =
    user?.roles?.some((r) => r.includes("ADMIN") || r.includes("CTO"))

  const menuItems = [
    { name: "ADMINISTER", path: isAuthenticated && isAdmin ? "/admin" : "/login/admin" },
    { name: "ENROLLMENT", path: "/enrollment" },
   
  ]

  // numbers
  const whatsappNumber = "8653903270"
  const phoneNumber = "9332554390"

  // detect device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  // dynamic contact link
  const contactLink = isMobile
    ? `tel:${phoneNumber}`
    : `https://wa.me/91${whatsappNumber}?text=Hello%20I%20want%20course%20information`

  return (

    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">

          <div className="w-14 h-14 overflow-hidden rounded-md">
            <img
              src="/image/logo.jpeg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-bold text-indigo-700 tracking-wide">
              EDUSKILLIQ
            </h1>
            <p className="text-xs text-gray-500 tracking-widest">
              FUTURETECH
            </p>
          </div>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">

          {menuItems.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              className="relative group hover:text-indigo-600 transition"
            >

              {item.name}

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>

            </Link>

          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">

          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
          >

            <Phone className="text-indigo-600 w-4 h-4" />

            <span className="text-sm font-semibold text-indigo-700">
              Contact Us
            </span>

          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-indigo-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            {menuOpen ? <X size={28} /> : <Menu size={28} />}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-gray-700">

            {menuItems.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-600"
              >
                {item.name}
              </Link>

            ))}

            <a
              href={contactLink}
              className="flex items-center space-x-2 pt-2 border-t"
            >

              <Phone className="text-indigo-600 w-4 h-4" />

              <span className="font-semibold text-indigo-700">
                Contact Us
              </span>

            </a>

          </div>

        </div>

      )}

    </nav>
  )
}