import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function CourseCardPublic({ course }) {
  const navigate = useNavigate()

  const handleEnroll = () => {
    navigate("/enrollment", {
      state: {
        courseId: course.id || course.courseId
      }
    })
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="
      w-full h-full
      rounded-2xl overflow-hidden
      bg-white/80 backdrop-blur-lg
      border border-gray-200
      shadow-sm hover:shadow-xl
      transition-all duration-300
      group flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={
            course.image && course.image.startsWith("http")
              ? course.image
              : "/fallback-course.jpg"
          }
          alt={course.title || "course"}
          onError={(e) => (e.target.src = "/fallback-course.jpg")}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* class badge */}
        <span className="
          absolute top-3 left-3 
          bg-white/90 text-xs px-2 py-1 
          rounded-md font-medium shadow
        ">
          {course.courseClass || "Course"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
          {course.title || course.courseName || "Untitled Course"}
        </h3>

        <button
          onClick={handleEnroll}
          disabled={!course.id && !course.courseId}
          className={`mt-auto w-full py-2.5 rounded-lg text-sm font-medium transition
            ${
              !course.id && !course.courseId
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
            }`}
        >
          Enroll Now
        </button>
      </div>
    </motion.div>
  )
}