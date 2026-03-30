import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // ✅ ADD
import useAuthStore from "../store/authStore";

export default function AuthInitializer({ children }) {

  const [loading, setLoading] = useState(true);
  const location = useLocation(); // ✅ ADD

  useEffect(() => {

    // ✅ PUBLIC ROUTES (NO AUTH NEEDED)
    const publicRoutes = [
  "/",
  "/enrollment",
  "/payment-success",
  "/payment-failure"
];

    if (publicRoutes.includes(location.pathname)) {
      useAuthStore.getState().setHydrated();
      setLoading(false);
      return; // 🔥 SKIP REFRESH
    }

    const restoreSession = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = res.data;

        useAuthStore.setState({
          accessToken,
          user,
          isAuthenticated: true
        });

      } catch (err) {

        console.log("No active session");

        useAuthStore.setState({
          accessToken: null,
          user: null,
          isAuthenticated: false
        });

      } finally {

        useAuthStore.getState().setHydrated();
        setLoading(false);

      }
    };

    restoreSession();

  }, [location.pathname]); // ✅ IMPORTANT

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Restoring session...
      </div>
    );
  }

  return children;
}