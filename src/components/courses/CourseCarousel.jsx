import { useEffect, useRef, useState } from "react";
import { getCourses } from "../../services/courseService";
import CourseCardPublic from "./CourseCardPublic";
import CourseSkeleton from "./CourseSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseCarousel({ filterType = "ALL", sectionRef }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  // 🔥 DRAG STATES
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      const list = Array.isArray(data) ? data : data.content || [];

      console.log("ALL COURSES:", list);

      const enabledCourses = list.filter(c => c.enabled !== false);

      setCourses(enabledCourses);
      setFilteredCourses(enabledCourses);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔥 FILTER
  useEffect(() => {
    if (!courses.length) return;

    if (filterType === "ALL") {
      setFilteredCourses(courses);
    } else {
      const result = courses.filter(
        c => c.courseClass?.toLowerCase() === filterType.toLowerCase()
      );
      setFilteredCourses(result);
    }
  }, [courses, filterType]);

  // 🔥 BUTTON SCROLL
  const scroll = (dir) => {
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // 🔥 DRAG HANDLERS
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUp = () => (isDown.current = false);
  const handleMouseLeave = () => (isDown.current = false);

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 overflow-hidden">
      
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-blue-300/30 blur-[120px]" />
        <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-indigo-300/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* HEADER */}
       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">

  {/* LEFT CONTENT */}
  <div>
    <h2 className="
      text-3xl sm:text-4xl md:text-5xl
      font-bold
      tracking-tight
      bg-gradient-to-r from-slate-900 via-indigo-700 to-slate-900
      bg-clip-text text-transparent
    ">
      Explore Courses
    </h2>

    {/* Subheading (IMPORTANT for premium feel) */}
    <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md">
      Discover industry-ready courses designed to build real-world skills and boost your career.
    </p>

    {/* Stylish underline */}
    <div className="mt-4 w-20 h-[4px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
  </div>

  {/* RIGHT BUTTONS */}
  <div className="hidden md:flex items-center gap-3">

    <button
      onClick={() => scroll("left")}
      className="
        p-3 rounded-full
        bg-white/80 backdrop-blur-md
        border border-gray-200
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:scale-105
      "
    >
      <ChevronLeft className="text-gray-700" />
    </button>

    <button
      onClick={() => scroll("right")}
      className="
        p-3 rounded-full
        bg-gradient-to-r from-blue-600 to-indigo-600
        text-white
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:scale-105
      "
    >
      <ChevronRight />
    </button>

  </div>
</div>

        {/* 🔥 SCROLL + GRID COMBO */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="
            grid grid-flow-col
            auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%]
            grid-rows-1 lg:grid-rows-2
            gap-5 overflow-x-auto scroll-smooth pb-2 pt-2
            [&::-webkit-scrollbar]:hidden
            cursor-grab active:cursor-grabbing
          "
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : (filteredCourses.length ? filteredCourses : courses).map((course, i) => (
                <div key={course.id || i} className="snap-center">
                  <CourseCardPublic course={course} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}