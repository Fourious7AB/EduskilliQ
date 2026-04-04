import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import reviews from "./reviewsData";
import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(reviews.length);
  const [playingVideoRef, setPlayingVideoRef] = useState(null);

  // ✅ FIXED BG STATE
  const [bg, setBg] = useState(reviews[0].bg);

  const loopData = [...reviews, ...reviews, ...reviews];

  // 👁️ Section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🎯 BG SYNC WITH CENTER CARD (FIXED)
  useEffect(() => {
    const realIndex = activeIndex % reviews.length;
    setBg(reviews[realIndex]?.bg);
  }, [activeIndex]);

  // 🎯 Detect center card
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.offsetWidth / 2;
    const cards = Array.from(container.children);

    let closest = 0;
    let min = Infinity;

    cards.forEach((card, i) => {
      const c = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(center - c);
      if (d < min) {
        min = d;
        closest = i;
      }
    });

    setActiveIndex(closest);
  };

  // ▶️ Auto next
  const goNext = () => {
    const container = scrollRef.current;
    if (!container) return;

    const nextIndex = activeIndex + 1;

    container.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // ♾️ Infinite loop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const total = reviews.length;

    if (activeIndex >= total * 2) {
      const newIndex = activeIndex - total;
      container.children[newIndex]?.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
      setActiveIndex(newIndex);
    }

    if (activeIndex < total) {
      const newIndex = activeIndex + total;
      container.children[newIndex]?.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);

  // 🎯 Start center
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const middle = container.children[reviews.length];

    if (middle) {
      container.scrollLeft =
        middle.offsetLeft -
        container.offsetWidth / 2 +
        middle.offsetWidth / 2;
    }
  }, []);

  return (
    <section
  ref={sectionRef}
  className="relative py-10  overflow-hidden"
>
      {/* Gradient BG */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${bg} opacity-80 blur-3xl transition-all duration-700`}
      />

      {/* Blur Thumbnail BG */}
      <img
        src={reviews[activeIndex % reviews.length]?.thumbnail}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-20 blur-3xl scale-110 opacity-40 transition-all duration-700"
      />

      <div className="relative text-center mb-20 px-4 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 -z-10 flex justify-center">
    <div className="w-[500px] h-[300px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl rounded-full"></div>
  </div>

  <div className="relative text-center mb-20 px-4">
        <h2 className="
          text-3xl sm:text-5xl md:text-6xl
          font-bold
          text-gray-800
          tracking-tight
        ">
          Our Experts & Mentors
        </h2>

        <div className="mt-3 flex justify-center">
          <div className="h-[3px] w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <p className="
          mt-6
          max-w-2xl mx-auto
          text-gray-600
          text-sm sm:text-base md:text-lg
        ">
          Develop skills that matter, with guidance from those who know best.
        </p>
      </div>

  

</div>

      {/* 🎥 Carousel */}
      <motion.div
        ref={scrollRef}
        onScroll={handleScroll}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        className="flex gap-6 sm:gap-10 overflow-x-auto px-2 sm:px-10 snap-x snap-mandatory no-scrollbar"
      >
        {loopData.map((item, index) => (
          <div key={index} className="snap-center shrink-0">
            <ReviewCard
              review={item}
              index={index}
              activeIndex={activeIndex}
              isActive={index === activeIndex}
              isVisible={isVisible}
              playingVideoRef={playingVideoRef}
              setPlayingVideoRef={setPlayingVideoRef}
              onVideoEnd={goNext}
              setBg={setBg}
              onCardClick={() => {
                const container = scrollRef.current;
                container.children[index]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                });
              }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}