import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LogoSlider from "../components/common/LogoSlider";

// Lazy load
const HeroSlider = lazy(() => import("../components/hero/Heroslider"));
const CourseCarousel = lazy(() => import("../components/courses/CourseCarousel"));
const ReviewSection = lazy(() => import("../components/reviews/ReviewSection"));

export default function HomePage() {
  const [filterType, setFilterType] = useState("ALL");
  const courseSectionRef = useRef(null);
  const location = useLocation();

  // ✅ SCROLL FUNCTION (OFFSET FIX)
  const scrollToCourses = useCallback(() => {
    if (!courseSectionRef.current) return;

    const yOffset = window.innerWidth < 768 ? -70 : -90;

    const y =
      courseSectionRef.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []);

  // Scroll restore
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  }, []);

  // ✅ Handle navigation filter + scroll
  useEffect(() => {
    if (!location.state?.filterType) return;

    setFilterType((prev) =>
      prev === location.state.filterType ? prev : location.state.filterType
    );

    setTimeout(() => {
      scrollToCourses();
    }, 150); // wait for render
  }, [location.state, scrollToCourses]);

  // ✅ Button click handler (Hero)
  const handleFilterSelect = useCallback((type) => {
    setFilterType((prev) => (prev === type ? prev : type));

    setTimeout(() => {
      scrollToCourses();
    }, 50);
  }, [scrollToCourses]);

  return (
    <div className="relative bg-gradient-to-br from-[#f0f9ff] via-white to-[#ecfeff] text-gray-900 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-emerald-200/40 blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-cyan-100/30 blur-[100px]" />
      </div>

      {/* SEO */}
      <Helmet>
        <title>EduSkilliQ FutureTech | Skill-Based Training</title>
        <meta
          name="description"
          content="Learn practical skills and become job-ready with EduSkilliQ FutureTech."
        />
        <link rel="canonical" href="https://eduskilliqfuturetech.com/" />
      </Helmet>

      {/* HERO */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <HeroSlider onFilterSelect={handleFilterSelect} />
      </Suspense>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent my-14" />

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Why Choose EduSkilliQ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Expert Mentors", desc: "Learn from experienced industry professionals." },
              { title: "Practical Projects", desc: "Build real-world projects with hands-on learning." },
              { title: "Career Support", desc: "Resume building and interview preparation guidance." },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white/70 backdrop-blur-xl border border-gray-200/50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent my-2" />

      {/* COURSES */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <CourseCarousel filterType={filterType} sectionRef={courseSectionRef} />
      </Suspense>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent my-2" />

      {/* LOGOS */}
      <LogoSlider />

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent my-14" />

      {/* REVIEWS */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <ReviewSection />
      </Suspense>

    </div>
  );
}