import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroCard({ slide, onButtonClick }) {
  const navigate = useNavigate();

const handleClick = () => {
  // ✅ Trigger filter (this will scroll via parent)
  onButtonClick(slide.type);

  // ✅ Navigate if needed
  if (window.location.pathname !== "/") {
    navigate("/", { state: { filterType: slide.type } });
  }

  // ✅ PERFECT SCROLL (no cut, no overlap)
  setTimeout(() => {
    const section = document.getElementById("courses-section");

    if (section) {
      // 🔥 Dynamic navbar offset (mobile + desktop)
      const yOffset = window.innerWidth < 768 ? -70 : -90;

      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, 150); // wait for navigation render
};

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative w-full min-h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r ${slide.bg} text-white p-8 md:p-14`}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl pointer-events-none" />

      <div className="relative grid md:grid-cols-2 items-center gap-10 h-full">
        
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {slide.title}
          </h1>

          <p className="text-lg text-white/80 max-w-md">
            {slide.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            
            <button
              onClick={handleClick}
              className="relative overflow-hidden bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg group"
            >
              <span className="relative z-10">Start Learning</span>
              <span className="absolute inset-0 bg-indigo-100 opacity-0 group-hover:opacity-100 transition" />
            </button>

            <button
              onClick={handleClick}
              className="border border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Explore Courses
            </button>

          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={slide.img}
            loading="eager"
            draggable={false}
            alt="hero"
            className="w-56 md:w-80 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-110"
          />
        </motion.div>

      </div>
    </motion.div>
  );
}