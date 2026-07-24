import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, CheckCircle2 } from "../common/Icons";

// Doctor Images
import cardiologistImg from "../../assets/Cardiologist (Heart).webp";
import dentalImg from "../../assets/Dental.webp";
import dietitianImg from "../../assets/Dietitian : Nutritionist.webp";
import physioImg from "../../assets/Physiotherapist.webp";
import surgeonImg from "../../assets/Surgeon.webp";

// Electrician Images
import electricianImg from "../../assets/Ecltric.webp";

// Plumber Images
import plumberImg from "../../assets/Plumbers.webp";

const doctorSlides = [
  {
    id: 1,
    name: "Cardiologist (Heart)",
    title: "Senior Cardiac & Heart Care Specialist",
    badge: "Heart Care",
    category: "Doctor",
    image: cardiologistImg,
  },
  {
    id: 6,
    name: "Electrician Services",
    title: "Certified electricians for wiring & repairs",
    badge: "Electrical",
    category: "Technician",
    image: electricianImg,
  },
  {
    id: 2,
    name: "Dental Specialist",
    title: "Oral Surgery & Cosmetic Dentistry",
    badge: "Dental Care",
    category: "Doctor",
    image: dentalImg,
  },
  {
    id: 7,
    name: "Plumber Services",
    title: "Expert plumbers for leaks & installations",
    badge: "Plumbing",
    category: "Technician",
    image: plumberImg,
  },
  {
    id: 3,
    name: "Dietitian & Nutritionist",
    title: "Clinical Nutrition & Lifestyle Dietitian",
    badge: "Nutrition Care",
    category: "Doctor",
    image: dietitianImg,
  },
  {
    id: 4,
    name: "Physiotherapist",
    title: "Rehabilitation & Movement Therapy",
    badge: "Physiotherapy",
    category: "Doctor",
    image: physioImg,
  },
  {
    id: 5,
    name: "Surgeon",
    title: "General & Laparoscopic Surgical Expert",
    badge: "Surgery Expert",
    category: "Doctor",
    image: surgeonImg,
  },
];

const HeroSection = ({ onOpenLogin, onExploreServices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide from right to left every 3.5 seconds - cycles through all mixed services
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % doctorSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative py-12 lg:py-24 2xl:py-14 overflow-hidden bg-medical-mesh"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Spacious Max Width Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE: Airy, Spacious Text Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Top Live Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="pulse-live absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-600"></span>
              </span>
              <span>24/7 Verified Audio & Video Consultations</span>
            </div>

            {/* Main Hero Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Trust Certified Doctors.{" "}
              <span className="text-gradient-teal">
                We Are Here For Your Healthcare Future
              </span>
            </h1>

            {/* Clean Spacious Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Our dedicated platform connects you with top-tier medical
              specialists, providing instant video consultations, home health
              visits, and expert prescriptions with absolute privacy and care.
            </p>

            {/* 2-Line Poetic Quote */}
            <div className="pl-5 border-l-4 border-teal-600 space-y-1.5 py-1">
              <p className="text-base sm:text-lg lg:text-xl font-serif italic text-teal-950 font-medium tracking-wide">
                "A true companion to life-saving hands,"
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-serif italic text-teal-900 font-medium tracking-wide">
                "A guiding support to healing doctors and caring patients."
              </p>
            </div>

            {/* Key Feature Checkmark Bullets (Clean Horizontal Row, No Wrapping) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>100% Verified </span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Instant Audio Call</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>HD Video Call</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Encrypted Records</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full">
              <button
                onClick={onOpenLogin}
                className="px-8 py-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 transition-all duration-300 flex items-center justify-center space-x-2.5 text-base w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#select-service"
                onClick={onExploreServices}
                className="px-7 py-4 rounded-full bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-300 text-slate-800 hover:text-teal-800 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-base shadow-sm w-full sm:w-auto text-center"
              >
                <span>Explore All Services</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Completely Unblocked Doctor Image Slider */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none space-y-4">
              {/* Carousel Viewport Container (Image is 100% Unblocked & Visible) */}
              <div className="relative h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">
                {/* Sliding Track (Right to Left Animation) */}
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {doctorSlides.map((slide) => (
                    <div
                      key={slide.id}
                      className="min-w-full h-full relative shrink-0"
                    >
                      <img
                        src={slide.image}
                        alt={slide.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Specialty Information Box (Strictly 2 Lines) */}
              <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-md transition-all duration-300">
                {/* Line 1: Name & Badge */}
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {doctorSlides[currentIndex].name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider shrink-0 ml-2">
                    {doctorSlides[currentIndex].badge}
                  </span>
                </div>
                {/* Line 2: Title Description */}
                <p className="text-xs text-slate-500 font-medium truncate pt-1">
                  {doctorSlides[currentIndex].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
