import { create } from "zustand"

const applyTheme = (theme) => {
  const root = document.documentElement

  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light"

      localStorage.setItem("theme", newTheme)
      applyTheme(newTheme) // ✅ APPLY THEME

      return { theme: newTheme }
    }),
}))

// ✅ APPLY ON FIRST LOAD
applyTheme(localStorage.getItem("theme") || "light")

export default useThemeStore