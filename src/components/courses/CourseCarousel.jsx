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

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      const list = Array.isArray(data) ? data : data.content || [];
      const enabledCourses = list.filter(c => c.enabled !== false);
      setCourses(enabledCourses);
      setFilteredCourses(enabledCourses);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // 🔥 Filter dynamically by courseClass
  useEffect(() => {
    if (!courses.length) return;
    if (filterType === "ALL") {
      setFilteredCourses(courses);
    } else {
      const result = courses.filter(c => c.courseClass?.toLowerCase() === filterType.toLowerCase());
      setFilteredCourses(result);
    }
  }, [courses, filterType]);

  const scroll = (dir) => {
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-blue-300/30 blur-[120px]" />
        <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-indigo-300/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex justify-between items-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Explore Courses</h2>
          <div className="hidden md:flex lg:hidden gap-3">
            <button onClick={() => scroll("left")} className="p-3 rounded-full bg-white border shadow hover:shadow-md transition"><ChevronLeft size={20} /></button>
            <button onClick={() => scroll("right")} className="p-3 rounded-full bg-white border shadow hover:shadow-md transition"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-6 lg:overflow-hidden">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <CourseSkeleton key={i} />)
            : (filteredCourses.length ? filteredCourses : courses).slice(0, 8).map((course, i) => (
                <div key={course.id || course.courseId || i} className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-0 lg:w-full snap-start">
                  <CourseCardPublic course={course} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}