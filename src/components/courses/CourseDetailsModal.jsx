import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Flame, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetailsModal({ course, onClose }) {
  const navigate = useNavigate();

  const [showPdf, setShowPdf] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const originalPrice = course?.discountPrice || 0; // crossed / MRP
const discountPrice = course?.joiningFee || 0;     // final payable price


  const discountPercent =
  originalPrice > 0
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  const [timeLeft, setTimeLeft] = useState(3600 * 5);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  useEffect(() => {
    if (!course) setIsPlaying(false);
  }, [course]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

   useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6">
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="
            bg-white w-full sm:max-w-6xl 
            h-[100vh] sm:h-auto sm:max-h-[90vh]
            rounded-none sm:rounded-3xl
            shadow-2xl overflow-hidden
            flex flex-col md:grid md:grid-cols-2 relative
          "
        >

          {/* CLOSE */}
          <button
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
            className="absolute top-4 right-4 bg-white shadow-lg p-2 rounded-full z-50 hover:scale-105 transition"
          >
            <X />
          </button>

          {/* VIDEO SECTION */}
          <div
            className="relative bg-black h-[220px] sm:h-[320px] md:h-full group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {course?.videoUrl ? (
              <>
                <video
                  className="w-full h-full object-cover"
                  src={course.videoUrl}
                  controls={false}
                  autoPlay={false}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  ref={(video) => {
                    if (video) {
                      isPlaying ? video.play() : video.pause();
                    }
                  }}
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

                {/* PLAY / PAUSE CENTER BUTTON */}
                <AnimatePresence>
                  {(!isPlaying || isHovered) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
                        {isPlaying ? (
                          <Pause className="text-indigo-600" size={30} />
                        ) : (
                          <Play className="text-indigo-600 ml-1" size={30} />
                        )}
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* TOP BADGE */}
                 <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  Preview Video
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Video Available
              </div>
            )}
          </div>

           {/* CONTENT (RESPONSIVE UX IMPROVED ONLY) */}
          <div className="p-4 sm:p-6 md:p-7 flex flex-col gap-4 sm:gap-5 overflow-y-auto">

            <div>
              <h2 className="text-lg sm:text-2xl font-bold leading-tight">
                {course?.courseName}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                {course?.title}
              </p>
            </div>

            {/* TIMER (mobile optimized) */}
            <div className="flex items-center justify-between bg-red-50 border border-red-100 p-2 sm:p-3 rounded-xl text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <Flame size={14} />
                Limited Offer
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={14} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* PRICE (mobile improved spacing) */}
            <div className="bg-gradient-to-br from-indigo-50 to-white border rounded-2xl p-4 sm:p-5">
  
  <div className="flex items-end gap-2 sm:gap-3 flex-wrap">

    {/* FINAL PRICE */}
    <div className="text-2xl sm:text-4xl font-bold text-indigo-600">
      ₹{discountPrice}
    </div>

    {/* ORIGINAL PRICE (CROSS PRICE) */}
    {originalPrice > discountPrice && (
      <div className="line-through text-gray-400 text-sm sm:text-lg">
        ₹{originalPrice}
      </div>
    )}

    {/* DISCOUNT BADGE */}
    {discountPercent > 0 && (
      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
        {discountPercent}% OFF
      </div>
    )}

  </div>

  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
    Inclusive of all taxes
  </p>
</div>


            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                "Lifetime Access",
                "Certificate Included",
                "Project Based Learning",
                "Beginner Friendly",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
                >
                  <CheckCircle size={14} className="text-green-600" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA (mobile sticky feel improved) */}
            <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <button
                onClick={() =>
                  navigate("/enrollment", {
                    state: { courseId: course?.id },
                  })
                }
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold active:scale-95 transition"
              >
                Enroll Now
              </button>

              {course?.pdfUrl && (
                <button
                  onClick={() => setShowPdf(true)}
                  className="flex-1 border py-3 rounded-xl font-semibold active:scale-95 hover:bg-gray-100 transition"
                >
                  Syllabus
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE CTA (IMPROVED SAFE AREA) */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-[9999] sm:hidden bg-white border-t p-3 pb-[env(safe-area-inset-bottom)] flex gap-2">
        <button
          onClick={() =>
            navigate("/enrollment", {
              state: { courseId: course?.id },
            })
          }
          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold active:scale-95"
        >
          Enroll ₹{discountPrice}
        </button>
      </div> */}

      {/* PDF VIEW */}
      {showPdf && (
        <div className="fixed inset-0 z-[10000] bg-black">
          <button
            onClick={() => setShowPdf(false)}
            className="absolute top-4 right-4 bg-white p-3 rounded-full z-[10001]"
          >
            <X />
          </button>

          <iframe src={course?.pdfUrl} className="w-full h-full" />
        </div>
      )}
    </>
  );
}