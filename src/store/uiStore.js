import { create } from "zustand"

const useUIStore = create((set) => ({
  loading: false,

  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false })
}))

export default useUIStore