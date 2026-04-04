import React from "react";

const logos = [
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775293724/Zepto_Logo_xuywtm.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775293736/Swiggy_logo__old_e87uu0.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775308238/Zomato_Logo_1_klplsp.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775293759/toppng.com-ola-cabs-logo-1439x512_ghpexb.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775293766/8b417a23405b886277a28a9ad351fb11_hgxrgw.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775293776/Meesho_uk0bli.png",
  "https://res.cloudinary.com/duf3tdqit/image/upload/q_auto/f_auto/v1775308064/TATA_1mg_Logo_cnp73j.png",
];

export default function LogoSlider() {
  return (
    <section className="relative py-8  sm:py-10 overflow-hidden">

      {/* 🔥 MATCH COURSE BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-blue-300/30 blur-[120px]" />
        <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-indigo-300/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">

  {/* TITLE */}
  <h2 className="
  text-xl 
  sm:text-2xl 
  md:text-3xl 
  font-semibold 
  leading-tight
  bg-gradient-to-r pb-4 from-blue-600 via-indigo-500 to-purple-600
  bg-clip-text text-transparent
">
  Trusted by Top Companies
</h2>

</div>

        {/* FADE EDGES */}
        <div className="pointer-events-none  absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-gray-50 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-gray-50 to-transparent z-20" />

        {/* ================= SLIDER ================= */}
        <div className="flex w-max animate-scroll gap-5 sm:gap-8 hover:[animation-play-state:paused]">

          {[...logos, ...logos].map((logo, i) => (
            <div
  className="
    flex items-center justify-center
    px-3 py-2 sm:px-4 sm:py-2
    rounded-xl sm:rounded-2xl
    bg-white/60 backdrop-blur-lg
    border border-gray-200/60
    shadow-sm hover:shadow-md
    transition-all duration-300
    hover:-translate-y-1
  "
>
              <img
  src={logo}
  alt="company logo"
  className="h-7 sm:h-8 md:h-10 object-contain"
/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}