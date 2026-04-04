import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CourseCardPublic({ course }) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleEnroll = () => {
    navigate("/enrollment", {
      state: { courseId: course.id || course.courseId },
    });
  };

  const title = course.title || "Course Description";
  const isLong = title.length > 60;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="
        w-full h-full rounded-2xl overflow-hidden
        bg-white border border-gray-200
        shadow-sm hover:shadow-xl transition-all duration-300
        group flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={
            course.image?.startsWith("http")
              ? course.image
              : "/fallback-course.jpg"
          }
          alt="course"
          onError={(e) => (e.target.src = "/fallback-course.jpg")}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-1 rounded">
          {course.courseClass || "Course"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* ✅ COURSE NAME */}
        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
          {course.courseName || "Course Name"}
        </h3>

        {/* ✅ DESCRIPTION WITH READ MORE */}
        <p className="text-sm text-gray-500 mt-1 transition-all duration-300">
          {expanded ? title : title.slice(0, 60)}

          {isLong && (
            <span
              onClick={() => setExpanded(!expanded)}
              className="text-indigo-600 cursor-pointer ml-1 font-medium"
            >
              {expanded ? " show less" : "...more"}
            </span>
          )}
        </p>

        {/* OPTIONAL PRICE (if needed later) */}
        {/* <p className="text-sm font-semibold mt-2 text-gray-800">
          ₹{course.joiningFee}
        </p> */}

        {/* BUTTON */}
        <button
          onClick={handleEnroll}
          className="
            mt-auto w-full py-2.5 rounded-lg text-sm font-medium
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white hover:opacity-90 transition
          "
        >
          Enroll Now
        </button>
      </div>
    </motion.div>
  );
}