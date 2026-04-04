import { useLocation } from "react-router-dom";
import CourseCarousel from "../components/courses/CourseCarousel";


export default function CoursePage() {
  const location = useLocation();
  const filterType = location.state?.filterType || "ALL";

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-8">
        Courses
      </h1>

      <CourseCarousel filterType={filterType} />

     
    </div>
  );
}