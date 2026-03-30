import React, { useEffect, useState } from "react";
import { User, Phone, Mail, BookOpen, Gift, ShieldCheck, GraduationCap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { getCourses } from "../services/courseService";
import paymentService from "../services/paymentService";
import loadRazorpay from "../utils/loadRazorpay";


const EnrollmentForm = () => {

  const location = useLocation()
const preSelectedCourseId = location.state?.courseId

  const navigate = useNavigate(); // ✅ ADD THIS

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    studentName: "",
    phone: "",
    whatsapp: "",
    email: "",
    referralCode: ""
  });

  useEffect(() => {
  getCourses()
    .then(data => {
      const list = data.filter(c => c.enabled)
      setCourses(list)

      // ✅ AUTO SELECT COURSE
      if (preSelectedCourseId) {
        const course = list.find(c => c.id === preSelectedCourseId)
        if (course) {
          setSelectedCourse(course)
        }
      }
    })
    .catch(console.error)
}, [preSelectedCourseId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const id = Number(e.target.value);
    const course = courses.find(c => c.id === id);
    setSelectedCourse(course);
  };

  const validate = () => {
    let err = {};

    if (!form.studentName) err.studentName = "Name required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Invalid phone";
    if (!form.email) err.email = "Email required";
    if (!selectedCourse) err.course = "Select course";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ UPDATED PAYMENT HANDLER
  const handlePayment = async () => {

  if (!validate()) return;
  if (processingPayment) return;

  const isLoaded = await loadRazorpay();

  if (!isLoaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    setProcessingPayment(true);

    const order = await paymentService.createOrder({
      studentName: form.studentName,
      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email,
      referralCode: form.referralCode,
      courseName: selectedCourse.courseName
    });

    // 🔥 FLAG (IMPORTANT FIX)
    let paymentCompleted = false;

    const options = {
      key: order.key,
      amount: order.amount * 100,
      currency: "INR",
      name: "EduSkillIQ",
      description: selectedCourse.courseName,
      order_id: order.orderId,

      // ✅ SUCCESS HANDLER
      handler: async function (response) {

        paymentCompleted = true;

        try {
          const res = await paymentService.verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,

            studentName: form.studentName,
            email: form.email,
            phone: form.phone,
            courseName: selectedCourse.courseName
          });

          if (res.status === "SUCCESS") {
            navigate("/payment-success", {
              state: {
                paymentId: response.razorpay_payment_id
              }
            });
          } else {
            navigate("/payment-failure");
          }

        } catch (err) {
          console.error(err);
          navigate("/payment-failure");
        }
      },

      // 🔥 SAFE MODAL HANDLER
      modal: {
        ondismiss: function () {
          if (!paymentCompleted) {
            console.log("User closed Razorpay before completion");
            navigate("/payment-failure");
          }
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    navigate("/payment-failure");
  } finally {
    setProcessingPayment(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="p-12 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">EduSkilliq Institute</h1>
          <p className="text-indigo-100 mb-8">
            Learn in-demand skills & build your career 
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><ShieldCheck size={18}/> Secure Payment</div>
            <div className="flex items-center gap-3"><BookOpen size={18}/> Industry Curriculum</div>
            <div className="flex items-center gap-3"><GraduationCap size={18}/> Placement Guidance</div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Enroll Now</h2>

          {/* COURSE */}
          <div className="mb-4">
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
  value={selectedCourse?.id || ""}   // ✅ IMPORTANT
  onChange={handleCourseChange}
  className="w-full border rounded-lg pl-10 p-3 focus:ring-2 focus:ring-indigo-500"
>
                <option value="">Select Course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.courseName}
                  </option>
                ))}
              </select>
            </div>
            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>

          {/* PRICE */}
          {selectedCourse && (
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border rounded-xl p-4 mb-4 shadow">
              <p className="text-gray-700">Course</p>
              <p className="font-bold text-lg">
  {selectedCourse.title || selectedCourse.courseName}
</p>
              <p className="text-indigo-600 text-xl font-bold mt-2">
                ₹ {selectedCourse.joiningFee}
              </p>
            </div>
          )}

          {/* INPUTS */}
          <div className="space-y-4">
            <Input icon={<User size={18}/>} name="studentName" placeholder="Full Name" value={form.studentName} onChange={handleChange} error={errors.studentName}/>
            <Input icon={<Phone size={18}/>} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} error={errors.phone}/>
            <Input icon={<Phone size={18}/>} name="whatsapp" placeholder="Whatsapp Number" value={form.whatsapp} onChange={handleChange}/>
            <Input icon={<Mail size={18}/>} name="email" placeholder="Email Address" value={form.email} onChange={handleChange} error={errors.email}/>
            <Input icon={<Gift size={18}/>} name="referralCode" placeholder="Referral Code" value={form.referralCode} onChange={handleChange}/>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePayment}
            disabled={!selectedCourse || processingPayment}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg mt-6 font-semibold hover:scale-105 transition disabled:bg-gray-400"
          >
            {processingPayment ? "Processing..." : `Pay ₹${selectedCourse?.joiningFee || ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// INPUT COMPONENT
const Input = ({ icon, error, ...props }) => (
  <div>
    <div className={`relative border rounded-lg ${error ? "border-red-500" : ""}`}>
      <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default EnrollmentForm;