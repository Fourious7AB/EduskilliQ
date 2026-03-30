import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentId = location.state?.paymentId;

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050816] overflow-hidden px-4">

      {/* Floating Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/30 blur-[140px] rounded-full top-[-120px] left-[-120px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-green-400/20 blur-[140px] rounded-full bottom-[-120px] right-[-120px] animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md">

        {/* Outer glow border */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-2xl rounded-3xl"></div>

        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 text-center">

          {/* Icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-500/20 border border-green-400/30 mb-6">
            <CheckCircle size={42} className="text-green-300" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Payment Successful
          </h1>

          <p className="text-white/60 mt-2 text-sm sm:text-base">
            Your enrollment has been confirmed successfully
          </p>

          {/* Payment ID */}
          {paymentId && (
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/70 break-all">
              <span className="text-white font-medium">Payment ID:</span>
              <div className="mt-1">{paymentId}</div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Go to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}