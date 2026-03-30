import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.jsx'
import useThemeStore from "./store/themeStore"
import { Toaster } from "react-hot-toast" // ✅ ADD THIS

function ThemeInitializer({ children }) {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return children
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <ThemeInitializer>
        
        <Toaster position="top-right" />
        
        <App />
      </ThemeInitializer>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)