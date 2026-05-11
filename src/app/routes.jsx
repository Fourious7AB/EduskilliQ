import { Route } from "react-router-dom"
import { lazy } from "react"

import ProtectedRoute from "../components/ProtectedRoute"
import CourseList from "../pages/courses/CourseList"

import EditCourse from "../pages/courses/EditCourse"
import CourseDetailsModal from "../components/courses/CourseDetailsModal"


// ================== PUBLIC PAGES ==================
const HomePage = lazy(() => import("../home/HomePage"))
const Login = lazy(() => import("../pages/Login"))
const EnrollmentPage = lazy(() => import("../pages/EnrollmentPage"))

// ✅ ADD THESE
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"))
const PaymentFailure = lazy(() => import("../pages/PaymentFailure"))

// ================== ADMIN ==================
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"))
const AdminDashboard = lazy(() => import("../pages/dashboard/AdminDashboard"))
const UsersPage = lazy(() => import("../pages/users/UsersPage"))
const UserDetails = lazy(() => import("../pages/users/UserDetails"))
const UpdateUser = lazy(() => import("../pages/users/UpdateUser"))
const CreateUser = lazy(() => import("../pages/users/CreateUser"))

const ReactivateStudent = lazy(() =>
  import("../pages/students/ReactivateStudent")
)

// ================== SALES ==================
const SalesLayout = lazy(() => import("../components/layout/SalesLayout"))
const SalesDashboard = lazy(() => import("../pages/dashboard/SalesDashboard"))
const SalesHistory = lazy(() => import("../pages/sales/SalesHistory"))

export const appRoutes = (
  <>
    {/* ================== PUBLIC ================== */}
    <Route path="/" element={<HomePage />} />
    <Route path="/enrollment" element={<EnrollmentPage />} />
    <Route path="/login/:role" element={<Login />} />

    {/* ✅ PAYMENT ROUTES */}
    <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/payment-failure" element={<PaymentFailure />} />

    {/* ================== ADMIN ================== */}
    <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN", "CTO"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />

  <Route path="users" element={<UsersPage />} />
  <Route path="users/create" element={<CreateUser />} />
  <Route path="users/:userId" element={<UserDetails />} />
  <Route path="users/:userId/edit" element={<UpdateUser />} />

  {/* COURSES */}
  <Route path="courses" element={<CourseList />} />
  <Route path="courses/edit/:id" element={<EditCourse />} />

  {/* ✅ STUDENTS */}
  <Route path="students/reactivate" element={<ReactivateStudent />} />
  
</Route>
{/* ================== SALES ================== */}
<Route
  path="/sales"
  element={
    <ProtectedRoute allowedRoles={["SALES", "ADMIN", "BDM","BDE","CTO"]}>
      <SalesLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<SalesDashboard />} />
  <Route path="history" element={<SalesHistory />} />
  <Route path="course-details" element={<CourseDetailsModal/>} />
</Route>
  </>
)