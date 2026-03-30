import useUIStore from "../store/uiStore"

export default function GlobalLoader() {
  const { loading } = useUIStore()

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-blue-500 z-[9999] transition-all duration-300 ${
        loading ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    />
  )
}