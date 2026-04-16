import { motion } from "framer-motion";
import { useState } from "react";
import CourseDetailsModal from "./CourseDetailsModal"; // ✅ IMPORT

export default function CourseCardPublic({ course }) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ✅ STATE

  // ✅ OPEN MODAL
  const handleOpen = () => {
    setOpenModal(true);
  };

  const title = course.title || "Course Description";
  const isLong = title.length > 60;

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        onClick={handleOpen} // 🔥 open modal
        className="
          w-full h-full rounded-2xl overflow-hidden
          bg-white border border-gray-200
          shadow-sm hover:shadow-xl transition-all duration-300
          group flex flex-col cursor-pointer
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
          
          {/* COURSE NAME */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-1">
            {course.courseName || "Course Name"}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mt-1 transition-all duration-300">
            {expanded ? title : title.slice(0, 60)}

            {isLong && (
              <span
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent modal open
                  setExpanded(!expanded);
                }}
                className="text-indigo-600 cursor-pointer ml-1 font-medium"
              >
                {expanded ? " show less" : "...more"}
              </span>
            )}
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 prevent double trigger
              handleOpen();
            }}
            className="
              mt-auto w-full py-2.5 rounded-lg text-sm font-medium
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white hover:opacity-90 transition
            "
          >
            View Details
          </button>
        </div>
      </motion.div>

      {/* ✅ MODAL */}
      {openModal && (
        <CourseDetailsModal
          course={course}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}