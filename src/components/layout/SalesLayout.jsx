import { Outlet } from "react-router-dom"
import SalesTopbar from "./SalesTopbar"

export default function SalesLayout() {
  return (
    <div className="app-bg min-h-screen">
      <SalesTopbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}