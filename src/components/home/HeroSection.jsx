import React, { useState, useEffect, useRef } from "react";
import { Calendar, ArrowRight, CheckCircle2 } from "./common/Icons";
import { gsap } from "gsap";

import cardiologistImg from "../../assets/Cardiologist (Heart).webp";
import dentalImg from "../../assets/Dental.webp";
import dietitianImg from "../../assets/Dietitian : Nutritionist.webp";
import physioImg from "../../assets/Physiotherapist.webp";
import surgeonImg from "../../assets/Surgeon.webp";
import electricianImg from "../../assets/Ecltric.webp";
import plumberImg from "../../assets/Plumbers.webp";

const doctorSlides = [
  {
    id: 1,
    name: "Cardiologist (Heart)",
    title: "Senior Cardiac & Heart Care Specialist",
    badge: "Heart Care",
    category: "Doctor",
    image: cardiologistImg,
    headingHighlight: "Certified Heart Specialists.",
    headingMain: "We Are Here For Your Healthcare Future",
    description: "Our dedicated platform connects you with top-tier medical specialists, providing instant video consultations, home health visits, and expert prescriptions with absolute privacy and care.",
    quote1: "\"A true companion to life-saving hands,\"",
    quote2: "\"A guiding support to healing doctors and caring patients.\"",
    features: ["100% Verified", "Instant Audio Call", "HD Video Call", "Encrypted Records"],
  },
  {
    id: 6,
    name: "Electrician Services",
    title: "Certified electricians for wiring & repairs",
    badge: "Electrical",
    category: "Technician",
    image: electricianImg,
    headingHighlight: "Certified Master Electricians.",
    headingMain: "Safe & Reliable Home Wiring Repairs",
    description: "Book verified electricians in minutes for emergency short-circuits, home rewiring, appliance installation, and safety inspections with guaranteed quality.",
    quote1: "\"Powering your homes safely and efficiently,\"",
    quote2: "\"Expert electrical solutions at your doorstep in 30 minutes.\"",
    features: ["30-Min Arrival", "Background Verified", "Upfront Pricing", "100% Safe Work"],
  },
  {
    id: 2,
    name: "Dental Specialist",
    title: "Oral Surgery & Cosmetic Dentistry",
    badge: "Dental Care",
    category: "Doctor",
    image: dentalImg,
    headingHighlight: "Expert Dental Specialists.",
    headingMain: "Pain-Free Oral Care & Smile Design",
    description: "Get instant consultation for tooth pain, cosmetic smile design, root canals, and pediatric dentistry from licensed, top-rated dental professionals.",
    quote1: "\"A healthy smile reflects a healthy life,\"",
    quote2: "\"Gentle dental care tailored for your entire family.\"",
    features: ["Licensed Dentists", "Teeth Cleaning", "Root Canal Experts", "Instant Booking"],
  },
  {
    id: 7,
    name: "Plumber Services",
    title: "Expert plumbers for leaks & installations",
    badge: "Plumbing",
    category: "Technician",
    image: plumberImg,
    headingHighlight: "Master Plumber Experts.",
    headingMain: "Fast Pipe Leak Repair & Installation",
    description: "Experienced plumbers ready for pipe leaks, bathroom fitting, clog removal, and drain cleaning with specialized tools and transparent pricing.",
    quote1: "\"Flowing comfort for every household,\"",
    quote2: "\"Prompt, clean, and reliable plumbing services on demand.\"",
    features: ["Leak Detection", "Pipe Installation", "Clog Removal", "Guaranteed Work"],
  },
  {
    id: 3,
    name: "Dietitian & Nutritionist",
    title: "Clinical Nutrition & Lifestyle Dietitian",
    badge: "Nutrition Care",
    category: "Doctor",
    image: dietitianImg,
    headingHighlight: "Certified Dietitians.",
    headingMain: "Personalized Diet Plans for Healthy Living",
    description: "Achieve your health goals with custom meal plans for weight management, diabetes control, PCOS, and sports nutrition guided by expert dietitians.",
    quote1: "\"Nourishing your body with science-backed care,\"",
    quote2: "\"Empowering your wellness journey with customized nutrition.\"",
    features: ["Custom Meal Plans", "Weight Control", "Diabetic Diets", "1-on-1 Coaching"],
  },
  {
    id: 4,
    name: "Physiotherapist",
    title: "Rehabilitation & Movement Therapy",
    badge: "Physiotherapy",
    category: "Doctor",
    image: physioImg,
    headingHighlight: "Expert Physiotherapists.",
    headingMain: "Rehabilitation & Joint Pain Relief",
    description: "Restore your mobility and relieve chronic back, neck, or joint pain with personalized physiotherapeutic care at home or online.",
    quote1: "\"A true companion to life-saving hands,\"",
    quote2: "\"A guiding support to healing doctors and caring patients.\"",
    features: ["Home Rehab Visits", "Posture Correction", "Joint Pain Relief", "Certified Pros"],
  },
  {
    id: 5,
    name: "Surgeon",
    title: "General & Laparoscopic Surgical Expert",
    badge: "Surgery Expert",
    category: "Doctor",
    image: surgeonImg,
    headingHighlight: "Senior Surgical Experts.",
    headingMain: "Laparoscopic & General Surgery Advice",
    description: "Consult with leading general and laparoscopic surgeons for pre-surgery guidance, second opinions, and post-operative recovery care.",
    quote1: "\"Precision, expertise, and ultimate patient safety,\"",
    quote2: "\"Guiding you through every step of surgical care.\"",
    features: ["Second Opinions", "Laparoscopic Guidance", "Post-Op Recovery", "Top Specialists"],
  },
];

const HeroSection = ({ onOpenLogin, onExploreServices }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedContentRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const quotesRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const desktopSliderRef = useRef(null);

  // Cycle slides automatically every 5 seconds (more relaxed reading pace)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % doctorSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 1. GSAP Master Page Entrance Timeline on Mount (Smooth & Elegant Pace)
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power2.out" },
    });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0 }
      );
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }

    if (quotesRef.current) {
      tl.fromTo(
        quotesRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.75 },
        "-=0.5"
      );
    }

    if (featuresRef.current && featuresRef.current.children) {
      tl.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.5"
      );
    }

    if (ctaRef.current && ctaRef.current.children) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
        "-=0.4"
      );
    }

    if (desktopSliderRef.current) {
      tl.fromTo(
        desktopSliderRef.current,
        { opacity: 0, x: 40, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power2.out" },
        "-=0.8"
      );
    }
  }, []);

  // 2. GSAP Timeline Animation ONLY on text content when slide changes (Smooth & Relaxed)
  useEffect(() => {
    if (animatedContentRef.current) {
      const slideTl = gsap.timeline();
      slideTl.fromTo(
        animatedContentRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const currentSlide = doctorSlides[currentIndex];

  const renderSlider = () => (
    <div className="relative mx-auto max-w-lg lg:max-w-none space-y-4 w-full">
      {/* Carousel Viewport Container */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/80 bg-slate-100 h-72 sm:h-[380px] lg:h-[460px]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {doctorSlides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative shrink-0">
              <img src={slide.image} alt={slide.name} className="w-full h-full object-cover object-top" />
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            {currentSlide.name}
          </h4>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase tracking-wider shrink-0 ml-2">
            {currentSlide.badge}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium truncate pt-1">
          {currentSlide.title}
        </p>
      </div>
    </div>
  );

  return (
    <section id="home" className="relative overflow-hidden bg-medical-mesh" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
      {/* Ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-200/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6 text-left w-full">

            {/* ANIMATED CONTENT WRAPPER */}
            <div ref={animatedContentRef} className="space-y-6">
              {/* Live Badge */}
              <div className="hidden lg:inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 font-semibold shadow-sm" style={{ fontSize: 'var(--text-sm)' }}>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="pulse-live absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-600" />
                </span>
                <span>24/7 Verified Audio & Video Consultations</span>
              </div>

              {/* Hero Heading */}
              <h1 ref={headingRef} className="font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ fontSize: 'var(--text-hero)' }}>
                {currentSlide.headingHighlight}{" "}
                <span className="text-gradient-teal">{currentSlide.headingMain}</span>
              </h1>

              {/* Body text */}
              <p ref={descRef} className="text-slate-600 leading-relaxed max-w-2xl" style={{ fontSize: 'var(--text-body)' }}>
                {currentSlide.description}
              </p>

              {/* Quote */}
              <div ref={quotesRef} className="pl-5 border-l-4 border-teal-600 space-y-1.5 py-1">
                <p className="font-serif italic text-teal-950 font-medium tracking-wide" style={{ fontSize: 'var(--text-body)' }}>
                  {currentSlide.quote1}
                </p>
                <p className="font-serif italic text-teal-900 font-medium tracking-wide" style={{ fontSize: 'var(--text-body)' }}>
                  {currentSlide.quote2}
                </p>
              </div>

              {/* SLIDE IMAGE CAROUSEL FOR MOBILE & IPAD */}
              <div className="block lg:hidden my-6">
                {renderSlider()}
              </div>

              {/* Feature Bullets */}
              <div ref={featuresRef} className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                {currentSlide.features.map((f) => (
                  <div key={f} className="flex items-center space-x-2 font-semibold text-slate-700 whitespace-nowrap" style={{ fontSize: 'var(--text-sm)' }}>
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* STATIC CTA BUTTONS */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <button
                onClick={onOpenLogin}
                className="px-7 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-lg shadow-teal-700/20 transition-all duration-300 flex items-center justify-center space-x-2.5 text-base whitespace-nowrap"
              >
                <Calendar className="w-5 h-5 shrink-0" />
                <span className="whitespace-nowrap">Book Appointment</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <a
                href="#select-service"
                onClick={onExploreServices}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-teal-50 border border-slate-300 hover:border-teal-300 text-slate-800 hover:text-teal-800 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-base shadow-sm text-center whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Explore All Services</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: DESKTOP SLIDER */}
          <div ref={desktopSliderRef} className="hidden lg:block lg:col-span-5">
            {renderSlider()}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
