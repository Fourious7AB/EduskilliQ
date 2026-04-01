import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AuthInitializer({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = [
      "/",
      "/enrollment",
      "/payment-success",
      "/payment-failure",
    ];

    const { accessToken, setHydrated } = useAuthStore.getState();

    // ✅ 1. SKIP PUBLIC ROUTES
    if (publicRoutes.includes(location.pathname)) {
      setHydrated();
      setLoading(false);
      return;
    }

    // ✅ 2. 🔥 GUARD: IF TOKEN ALREADY EXISTS → SKIP REFRESH
    if (accessToken) {
      console.log("✅ Token already exists → skip refresh");
      setHydrated();
      setLoading(false);
      return;
    }

    // ✅ 3. ONLY CALL REFRESH WHEN REALLY NEEDED
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
          isAuthenticated: true,
        });

      } catch (err) {
        console.log("❌ No active session");

        useAuthStore.setState({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      } finally {
        setHydrated();
        setLoading(false);
      }
    };

    restoreSession();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Restoring session...
      </div>
    );
  }

  return children;
}