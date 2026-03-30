import { create } from "zustand"
import { persist } from "zustand/middleware"
import { loginUser, logoutUser } from "../services/AuthService"

const useAuthStore = create(
  persist(
    (set) => ({

      accessToken: null,
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      login: async (data) => {

        const res = await loginUser(data)

        set({
          accessToken: res.accessToken,
          user: res.user,
          isAuthenticated: true
        })

        return res
      },

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: true
        }),

      logout: async () => {

  try {
    await logoutUser()
  } catch {}

  set({
    accessToken: null,
    user: null,
    isAuthenticated: false
  })

  localStorage.removeItem("auth-storage") // 🔥 IMPORTANT
},

      setHydrated: () => set({ isHydrated: true })

    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state.setHydrated()
      }
    }
  )
)

export default useAuthStore