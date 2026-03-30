import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function ReviewCard({
  review,
  isActive,
  index,
  activeIndex,
  onVideoEnd,
  onCardClick,
  playingVideoRef,
  setPlayingVideoRef,
  isVisible,
}) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [progress, setProgress] = useState(0);

  // 🎥 TRACK PROGRESS + END
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const update = () => {
      if (!v.duration) return;
      setProgress((v.currentTime / v.duration) * 100);
    };

    const handleEnd = () => {
      setIsPlaying(false);
      onVideoEnd();
    };

    v.addEventListener("timeupdate", update);
    v.addEventListener("ended", handleEnd);

    return () => {
      v.removeEventListener("timeupdate", update);
      v.removeEventListener("ended", handleEnd);
    };
  }, [onVideoEnd]);

  // ▶️ AUTO PLAY ONLY ACTIVE
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!isVisible) {
      v.pause();
      return;
    }

    if (isActive) {
      if (playingVideoRef && playingVideoRef !== v) {
        playingVideoRef.pause();
      }

      v.muted = false;
      v.play().then(() => setIsPlaying(true)).catch(() => {});
      setPlayingVideoRef(v);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [isActive, isVisible]);

  const distance = index - activeIndex;

  return (
    <motion.div
      onClick={onCardClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      animate={{
        rotateY: distance * -20,
        scale: isActive ? 1.2 : isHover ? 1.05 : 0.75,
        z: isActive ? 120 : 0,
        opacity: Math.abs(distance) > 3 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative w-[220px] sm:w-[260px] aspect-[9/16] rounded-[28px] overflow-hidden border border-white/10 shadow-xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src={review.video}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* 🌑 GRADIENT OVERLAY */}
      <div
        className={`absolute inset-0 transition duration-700 ${
          isActive
            ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            : "bg-black/40"
        }`}
      />

      {/* ▶️ / ⏸ BUTTON */}
      {(!isPlaying || isHover) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const v = videoRef.current;

            if (!v) return;

            if (v.paused) {
              if (playingVideoRef && playingVideoRef !== v) {
                playingVideoRef.pause();
              }

              v.muted = false;
              v.play();
              setIsPlaying(true);
              setPlayingVideoRef(v);
            } else {
              v.pause();
              setIsPlaying(false);
            }
          }}
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="bg-white/20 backdrop-blur-lg p-4 rounded-full">
            {isPlaying ? <Pause /> : <Play />}
          </div>
        </button>
      )}

      {/* 🧑 REVIEW CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isActive ? 1 : 0.6,
          y: isActive ? 0 : 10,
        }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-4 left-4 right-4 z-20 text-white"
      >
        {/* 💬 Review */}
        <p className="text-xs sm:text-sm leading-tight line-clamp-3 mb-2 opacity-90">
          "{review.review}"
        </p>

        {/* 👤 Name + Role */}
        <div className="flex flex-col">
          <span className="font-semibold text-sm sm:text-base">
            {review.name}
          </span>
          <span className="text-[11px] sm:text-xs opacity-80">
            {review.role}
          </span>
        </div>
      </motion.div>

      {/* 📊 PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-white transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}