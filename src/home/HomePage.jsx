import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async"
import HeroSlider from "../components/hero/Heroslider";
import CourseCarousel from "../components/courses/CourseCarousel";
import ReviewSection from "../components/reviews/ReviewSection";

export default function HomePage() {
  const [filterType, setFilterType] = useState("ALL");
  const courseSectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
  }, []);

  useEffect(() => {
    if (location.state?.filterType) {
      setFilterType(location.state.filterType);
      courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <div className="bg-gray-50">
      
      {/* ✅ PROFESSIONAL SEO METADATA */}
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

        {/* ✅ Open Graph (for sharing on WhatsApp, Facebook) */}
        <meta property="og:title" content="EduSkilliQ FutureTech" />
        <meta
          property="og:description"
          content="Transforming students into skilled professionals through expert mentorship and practical learning."
        />
        <meta property="og:url" content="https://eduskilliqfuturetech.com" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EduSkilliQ FutureTech | Skill-Based Training"
        />
        <meta
          name="twitter:description"
          content="Learn practical skills, build real-world projects, and become job-ready with EduSkilliQ."
        />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://eduskilliqfuturetech.com/" />
      </Helmet>

      {/* Hero Slider */}
      <HeroSlider
        onFilterSelect={(type) => {
          setFilterType(type);
          courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Features */}
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

      <CourseCarousel filterType={filterType} sectionRef={courseSectionRef} />
      <ReviewSection />
    </div>
  );
}