import { FaLinkedin, FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaMapMarkerAlt } from "react-icons/fa"

export default function Footer(){

return(

<footer className="bg-gray-900 text-gray-300 pt-16 pb-8">

<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-10">

{/* COMPANY INFO */}

<div>

<h2 className="text-2xl font-bold text-white mb-4">
EduSkilliQ
</h2>

<p className="text-gray-400 mb-6 leading-relaxed">Success is not just about learning—it’s about applying, experimenting, and growing every day. Our goal is to prepare you to step confidently into the professional world with skills, confidence, and a mindset for lifelong growth.
</p>

{/* SOCIAL MEDIA */}

<div className="flex gap-4 text-xl">

<a
href="https://www.linkedin.com/company/112104210/admin/dashboard/"
target="_blank"
rel="noopener noreferrer"
className="hover:text-blue-500 transition"
>
<FaLinkedin/>
</a>

<a
href="https://www.facebook.com/profile.php?id=61588505925745"
target="_blank"
rel="noopener noreferrer"
className="hover:text-blue-600 transition"
>
<FaFacebook/>
</a>

<a
href="https://x.com/home?lang=en-in"
target="_blank"
rel="noopener noreferrer"
className="hover:text-sky-400 transition"
>
<FaTwitter/>
</a>

<a
href="https://www.youtube.com/@Eduskilliqfuturetech"
target="_blank"
rel="noopener noreferrer"
className="hover:text-red-500 transition"
>
<FaYoutube/>
</a>

<a
href="https://www.instagram.com/eduskilliq/"
target="_blank"
rel="noopener noreferrer"
className="hover:text-pink-500 transition"
>
<FaInstagram/>
</a>

</div>

</div>


{/* QUICK LINKS */}

<div>

{/* <h3 className="text-white text-lg font-semibold mb-5">
Quick Links
</h3>

<ul className="space-y-3">

<li className="hover:text-white cursor-pointer transition">
Home
</li>

<li className="hover:text-white cursor-pointer transition">
About Us
</li>

<li className="hover:text-white cursor-pointer transition">
Courses
</li>

<li className="hover:text-white cursor-pointer transition">
Contact
</li>

<li className="hover:text-white cursor-pointer transition">
Privacy Policy
</li>

</ul> */}

</div>


{/* COURSES */}

<div>

{/* <h3 className="text-white text-lg font-semibold mb-5">
Popular Courses
</h3>

<ul className="space-y-3">

<li className="hover:text-white cursor-pointer transition">
Class 1 to 12 
</li>

<li className="hover:text-white cursor-pointer transition">
Backend Development
</li>

<li className="hover:text-white cursor-pointer transition">
Java + Spring Boot
</li>

<li className="hover:text-white cursor-pointer transition">
React Frontend
</li>

<li className="hover:text-white cursor-pointer transition">
Career Guidance
</li>

</ul> */}

</div>


{/* OFFICE LOCATION */}

<div>

<h3 className="text-white text-lg font-semibold mb-5">
Our Office
</h3>

<a
href="https://maps.google.com/?q=Eduskilliq+Futuretech+Private+Limited"
target="_blank"
rel="noopener noreferrer"
className="flex items-center gap-3 text-lg hover:text-green-400 transition"
>

<FaMapMarkerAlt className="text-3xl"/>

<span>View Location on Google Maps</span>

</a>

<p className="mt-4 text-gray-400 text-sm">
P1 Raghunathsayar more, Bishnupur, Bankura, pin:722122
</p>

</div>

</div>


{/* BOTTOM BAR */}

<div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">

© {new Date().getFullYear()} EduSkill. All rights reserved.

</div>

</footer>

)

}