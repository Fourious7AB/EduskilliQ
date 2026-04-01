import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// 🔥 Lazy load components
const HeroSlider = lazy(() => import("../components/hero/Heroslider"));
const CourseCarousel = lazy(() => import("../components/courses/CourseCarousel"));
const ReviewSection = lazy(() => import("../components/reviews/ReviewSection"));

export default function HomePage() {
  const [filterType, setFilterType] = useState("ALL");
  const courseSectionRef = useRef(null);
  const location = useLocation();

  // ✅ Scroll restore (runs once)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  }, []);

  // ✅ Prevent unnecessary re-render
  useEffect(() => {
    if (!location.state?.filterType) return;

    setFilterType((prev) => {
      if (prev === location.state.filterType) return prev;
      return location.state.filterType;
    });

    courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [location.state]);

  // ✅ Memoized handler (no re-creation)
  const handleFilterSelect = useCallback((type) => {
    setFilterType((prev) => (prev === type ? prev : type));
    courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50">
      
      {/* SEO */}
      <Helmet>
        <title>
          EduSkilliQ FutureTech | Skill-Based Tuition & Job-Ready Training
        </title>

        <meta
          name="description"
          content="EduSkilliQ FutureTech offers expert-led tuition and skill-based courses to transform students into confident, job-ready professionals with real-world project experience."
        />

        <meta
          name="keywords"
          content="tuition center, skill development, job-ready training, MERN stack, student courses, practical learning, EduSkilliQ"
        />

        <meta name="author" content="EduSkilliQ FutureTech" />

        <meta property="og:title" content="EduSkilliQ FutureTech" />
        <meta
          property="og:description"
          content="Transforming students into skilled professionals through expert mentorship and practical learning."
        />
        <meta property="og:url" content="https://eduskilliqfuturetech.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EduSkilliQ FutureTech | Skill-Based Training"
        />
        <meta
          name="twitter:description"
          content="Learn practical skills, build real-world projects, and become job-ready with EduSkilliQ."
        />

        <link rel="canonical" href="https://eduskilliqfuturetech.com/" />
      </Helmet>

      {/* 🔥 Lazy + Suspense */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <HeroSlider onFilterSelect={handleFilterSelect} />
      </Suspense>

      {/* Features (unchanged UI) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EduSkilliQ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group bg-white/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all duration-300 hover:bg-white/40">
              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
              <h3 className="text-xl font-semibold mb-3">Expert Mentors</h3>
              <p className="text-gray-600">
                Learn from experienced industry professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-3">
                Practical Projects
              </h3>
              <p className="text-gray-600">
                Build real-world projects with hands-on learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-3">
                Career Support
              </h3>
              <p className="text-gray-600">
                Resume building and interview preparation guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <CourseCarousel filterType={filterType} sectionRef={courseSectionRef} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <ReviewSection />
      </Suspense>
    </div>
  );
}