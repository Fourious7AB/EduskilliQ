import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050816] overflow-hidden px-4">

      {/* Floating danger blobs */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/25 blur-[140px] rounded-full top-[-120px] left-[-120px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[140px] rounded-full bottom-[-120px] right-[-120px] animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md">

        {/* glow border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-500/20 blur-2xl rounded-3xl"></div>

        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 text-center">

          {/* Icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-red-500/20 border border-red-400/30 mb-6">
            <XCircle size={42} className="text-red-300" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Payment Failed
          </h1>

          <p className="text-white/60 mt-2 text-sm sm:text-base">
            Something went wrong. Please try again
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/enrollment")}
            className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-red-400 to-pink-500 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Try Again
          </button>

        </div>
      </div>
    </div>
  );
}