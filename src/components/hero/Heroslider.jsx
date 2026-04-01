import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import HeroCard from "./HeroCard";

function HeroSlider({ onFilterSelect }) {
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

  const extendedSlides = useMemo(() => [...slides, slides[0]], [slides]);

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const intervalRef = useRef(null);

  // ✅ optimized interval
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (current === slides.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 600);
      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [current, slides.length]);

  // ✅ memoized handlers
  const handleDragEnd = useCallback((event, info) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      setCurrent(prev => prev + 1);
    } else if (info.offset.x > threshold) {
      setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  }, [slides.length]);

  const handleFilterClick = useCallback((type) => {
    onFilterSelect(type);
  }, [onFilterSelect]);

  return (
    <section className="relative w-full overflow-hidden bg-white py-10">
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        drag="x"
        dragElastic={0.08}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={(e, info) => {
          handleDragEnd(e, info);
          setIsPaused(false);
        }}
        animate={{ x: `-${current * 100}%` }}
        transition={isTransitioning ? { duration: 0.7 } : { duration: 0 }}
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
    </section>
  );
}

export default React.memo(HeroSlider);