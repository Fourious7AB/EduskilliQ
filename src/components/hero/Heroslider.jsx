import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import HeroCard from "./HeroCard";

export default function HeroSlider({ onFilterSelect }) {
  const slides = useMemo(() => [
    {
      title: "Upgrade Your Skills With EduSkilliQ",
      desc: "Learn industry ready skills with expert mentors.",
      img: "/image/badgelogo.webp",
      bg: "from-blue-600 via-indigo-600 to-blue-900",
      type: "SKILL"
    },
    {
      title: "From Play School to Board Exams",
      desc: "One Place for Complete Success (Nursery to XII).",
      img: "/image/itoxi.webp",
      bg: "from-emerald-500 via-teal-500 to-cyan-700",
      type: "SCHOOL"
    },
    {
      title: "Learn From Industry Experts",
      desc: "Get mentorship and career guidance.",
      img: "/image/prfastional.webp",
      bg: "from-pink-500 via-rose-500 to-red-500",
      type: "PROFESSIONAL"
    }
  ], []);

  const extendedSlides = [...slides, slides[0]];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // ✅ Smooth auto slide (no lag)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // ✅ Infinite loop fix (no jump glitch)
  useEffect(() => {
    if (current === slides.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [current, slides.length]);

  const handleFilterClick = (type) => {
    onFilterSelect(type);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 will-change-transform">
      
      {/* Background blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      {/* Slider */}
      <motion.div
        className="flex will-change-transform"
        animate={{ x: `-${current * 100}%` }}
        transition={
          isTransitioning
            ? { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
            : { duration: 0 }
        }
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <HeroCard
              slide={slide}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
              onButtonClick={handleFilterClick}
            />
          </div>
        ))}
      </motion.div>

      {/* DOTS */}
      <div className="mt-8 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`relative transition-all duration-300 rounded-full ${
              current === index
                ? "w-10 h-3 bg-indigo-600"
                : "w-3 h-3 bg-gray-300"
            }`}
          >
            {current === index && (
              <motion.div
                layoutId="dot"
                className="absolute inset-0 rounded-full bg-indigo-400 blur-sm"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}