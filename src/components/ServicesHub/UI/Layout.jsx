import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../Location/SearchBar';
import Doctors from '../Services/Doctors';
import { X, User, CheckCircle2, ArrowRight } from '../../home/UI/Icons';
import { gsap } from 'gsap';

import doctorImg from '../../../assets/DoctorBG.webp';
import electricianImg from '../../../assets/ElectricianBG.webp';
import plumberImg from '../../../assets/PlumberBG.webp';

const serviceSlides = [
  {
    id: 'doctor',
    image: doctorImg,
    line1: 'Certified Healthcare Doctors',
    line2: 'Instant Home Consultation',
    line3: 'Top Verified Medical Care',
  },
  {
    id: 'electrician',
    image: electricianImg,
    line1: 'Certified Master Electricians',
    line2: 'Safe Wiring & Repairs',
    line3: '30-Minute Fast Arrival',
  },
  {
    id: 'plumber',
    image: plumberImg,
    line1: 'Expert Master Plumbers',
    line2: 'Leak Repair & Fitting',
    line3: 'Prompt & Clean Execution',
  },
];

const ServiceHubLayout = ({ currentUser, onLogout, showNotification }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const drawerRef = useRef(null);
  const headerImageRef = useRef(null);
  const headerTextRef = useRef(null);
  const ipadImageRef = useRef(null);
  const ipadTextRef = useRef(null);

  // GSAP 3D Slide & Flip Animation for Mobile & iPad Header Images & Synced Text
  useEffect(() => {
    const interval = setInterval(() => {
      const imgEl = headerImageRef.current;   // Mobile image
      const textEl = headerTextRef.current;   // Mobile text
      const ipadImg = ipadImageRef.current;   // iPad image
      const ipadText = ipadTextRef.current;   // iPad text

      if (!imgEl && !ipadImg) return;

      // Animate BOTH text elements out
      if (textEl) gsap.to(textEl, { opacity: 0, y: -4, duration: 0.25, ease: 'power1.in' });
      if (ipadText) gsap.to(ipadText, { opacity: 0, y: -4, duration: 0.25, ease: 'power1.in' });

      // Slide & flip out BOTH images to left
      const animateOut = (el) => {
        if (!el) return;
        gsap.to(el, { x: -45, rotationY: -90, opacity: 0, duration: 0.35, ease: 'power2.in' });
      };
      animateOut(imgEl);
      animateOut(ipadImg);

      // After out-animation, update slide and animate in
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % serviceSlides.length);

        // Text slide in
        const animateTextIn = (el) => {
          if (!el) return;
          gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' });
        };
        animateTextIn(textEl);
        animateTextIn(ipadText);

        // Image flip in
        const animateImgIn = (el) => {
          if (!el) return;
          gsap.fromTo(el, { x: 45, rotationY: 90, opacity: 0 }, { x: 0, rotationY: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.3)' });
        };
        animateImgIn(imgEl);
        animateImgIn(ipadImg);
      }, 360);

    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // GSAP Floating Card Entrance Animation
  useEffect(() => {
    if (menuOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { scale: 0.85, opacity: 0, y: -12, transformOrigin: 'top right' },
        { scale: 1, opacity: 1, y: 0, duration: 0.28, ease: 'back.out(1.5)' }
      );
    }
  }, [menuOpen]);

  // Graceful GSAP Exit Animation
  const handleCloseMenu = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        scale: 0.9,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setMenuOpen(false),
      });
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative pb-16 lg:pb-0">
      {/* CUSTOM POSTER HEADER BANNER FOR MOBILE & IPAD (< 1024px) */}
      <div className="lg:hidden w-full bg-[#40826D] text-white shadow-md transition-colors relative overflow-hidden">

        {/* SearchBar on top */}
        <div className="w-full px-4 pt-2.5 pb-2 sm:px-5 sm:pt-3 sm:pb-3 md:px-10 md:pt-5 md:pb-4">
          <div className="w-full max-w-xl md:max-w-4xl mx-auto">
            <SearchBar showNotification={showNotification} />
          </div>
        </div>

        {/* ── MOBILE ONLY (< 768px): Matches iPad composition perfectly ── */}
        <div className="md:hidden relative px-4 py-3 min-h-[175px] flex flex-col justify-center overflow-hidden">

          {/* Decorative background circles (mobile scale) */}
          <div className="absolute top-[-30px] right-[35%] w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute bottom-[-40px] right-[5%] w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-[5px] left-[-15px] w-24 h-24 bg-white/5 rounded-full pointer-events-none" />

          {/* Left Text — 56% width, vertically centered to align with Doctor's neck level */}
          <div ref={headerTextRef} className="w-[56%] flex flex-col justify-center space-y-2 z-10 pr-1" style={{ opacity: 1 }}>
            <div className="inline-flex">
              <span className="text-[9px] font-extrabold text-amber-300 tracking-wider uppercase bg-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                {serviceSlides[currentImageIndex].line2}
              </span>
            </div>
            <div className="text-[14px] font-black text-white leading-tight drop-shadow-sm whitespace-nowrap">
              {serviceSlides[currentImageIndex].line1}
            </div>
            <div className="text-[11px] text-emerald-100/90 font-medium whitespace-nowrap">
              {serviceSlides[currentImageIndex].line3}
            </div>
            <div className="flex items-center pt-1">
              <button className="flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-[11px] px-4 py-1.5 rounded-full shadow-md transition-all duration-200 hover:scale-105">
                <span>Book now</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>

          {/* Image — 52% absolute right, full height top to bottom like iPad */}
          <div className="absolute right-0 top-0 bottom-0 w-[52%] flex items-end justify-end overflow-visible z-0" style={{ perspective: 1000 }}>
            <img
              ref={headerImageRef}
              src={serviceSlides[currentImageIndex].image}
              alt="Service Professional"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d', objectPosition: 'right bottom' }}
            />
          </div>
        </div>

        {/* ── IPAD ONLY (md: 768px+): Premium wide banner ── */}
        <div className="hidden md:flex relative w-full max-w-4xl mx-auto items-stretch min-h-[310px] px-12 pb-8 overflow-hidden">

          {/* Decorative background circles */}
          <div className="absolute top-[-40px] right-[30%] w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute bottom-[-60px] right-[10%] w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-[10px] left-[-20px] w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

          {/* iPad Left Text */}
          <div ref={ipadTextRef} className="flex-1 flex flex-col justify-center space-y-4 z-10 pr-10">
            <div className="inline-flex">
              <span className="text-xs font-extrabold text-amber-300 tracking-[0.2em] uppercase bg-white/10 px-3 py-1 rounded-full">
                {serviceSlides[currentImageIndex].line2}
              </span>
            </div>
            <div className="text-4xl font-black text-white leading-tight drop-shadow-md">
              {serviceSlides[currentImageIndex].line1}
            </div>
            <div className="text-lg text-emerald-100/90 font-medium">
              {serviceSlides[currentImageIndex].line3}
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <button className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-base px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                <span>Book now</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
            </div>
          </div>

          {/* iPad Right Image: absolute, full height, flush to right edge */}
          <div className="absolute right-0 bottom-0 top-0 w-[52%] flex items-end justify-end overflow-visible" style={{ perspective: 1000 }}>
            <img
              ref={ipadImageRef}
              src={serviceSlides[currentImageIndex].image}
              alt="Service Professional"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d', objectPosition: 'right bottom' }}
            />
          </div>
        </div>
      </div>

      {/* TOP NAVIGATION BAR FOR DESKTOP ONLY (>= 1024px) */}
      <div className={`hidden lg:block sticky top-0 ${menuOpen ? 'z-[999]' : 'z-40'}`}>
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-24 flex items-center justify-between relative">

            {/* LEFT: BRAND LOGO */}
            <div className="flex items-center space-x-2 cursor-pointer shrink-0">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Service<span className="text-[#2563EB]">Hub</span>
              </span>
            </div>

            {/* CENTER: SEARCHBAR */}
            <div className="flex-1 max-w-xl mx-4">
              <SearchBar showNotification={showNotification} />
            </div>

            {/* RIGHT: USER / ACCOUNT MENU BUTTON */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (menuOpen) {
                    handleCloseMenu();
                  } else {
                    setMenuOpen(true);
                  }
                }}
                className="p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 hover:shadow-[0_0_16px_rgba(37,99,235,0.2)] flex items-center justify-center cursor-pointer group"
                aria-label="Account Menu"
                title="Account Menu"
              >
                <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* FULL ENTIRE SCREEN BACKDROP & DROPDOWN (OUTSIDE HEADER TO COVER 100% OF PAGE) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99999] pointer-events-auto">
          {/* Entire Screen Light Backdrop Overlay (Backside page visible, clicks blocked) */}
          <div
            onClick={handleCloseMenu}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] animate-fadeIn cursor-pointer"
          />

          {/* Floating Dropdown Card */}
          <div
            ref={drawerRef}
            className="fixed right-4 sm:right-6 top-[68px] z-[100000] w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-900 space-y-3 animate-fadeIn"
          >
            {/* INLINE USER DETAILS */}
            {currentUser ? (
              <div className="space-y-1 pb-3 border-b border-slate-100">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {currentUser.name || 'User Account'}
                </div>
                <div className="text-xs text-slate-500 font-medium truncate">
                  {currentUser.email || 'Verified User'}
                </div>
                <div className="pt-1.5 flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Verified Active Member</span>
                </div>
              </div>
            ) : (
              <div className="pb-2">
                <button
                  type="button"
                  onClick={() => {
                    handleCloseMenu();
                    setShowAccountModal(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Sign In / Log In
                </button>
              </div>
            )}

            {/* LOGOUT BUTTON */}
            {currentUser && onLogout && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handleCloseMenu();
                    setTimeout(() => onLogout(), 200);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* USER ACCOUNT DETAILS MODAL (CLEAN & PROFESSIONAL MINIMAL DESIGN) */}
      {showAccountModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowAccountModal(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                User Account
              </h3>
              <button
                type="button"
                onClick={() => setShowAccountModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Info Card (Clean & Minimal) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="text-base font-bold text-slate-900">
                {currentUser?.name || 'User Account'}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {currentUser?.email || 'Verified User'}
              </div>
              <div className="pt-2 flex items-center space-x-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Verified Active Member</span>
              </div>
            </div>

            {/* Action Button (Single Logout Action) */}
            {onLogout && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowAccountModal(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* URBANCOMPANY-STYLE MOBILE & IPAD BOTTOM NAVIGATION BAR (< 1024px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden py-1 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around py-1 px-6 max-w-sm mx-auto">
          {/* Logo / Brand Item (ServiceHub) */}
          <div className="flex flex-col items-center justify-center space-y-1 cursor-pointer group">
            <div className="w-3.5 h-3.5 text-black flex items-center justify-center font-bold text-[11px]">
              SH
            </div>
            <span className="text-[9.5px] font-normal text-slate-600 group-hover:text-slate-900 tracking-tight">
              ServiceHub
            </span>
          </div>

          {/* Account Details Button */}
          <button
            type="button"
            onClick={() => setShowAccountModal(true)}
            className="flex flex-col items-center justify-center space-y-1 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-center rounded-lg transition-all duration-300 group-hover:bg-blue-50/80 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]">
              <User className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-600 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-[9.5px] font-normal text-slate-600 group-hover:text-blue-600">
              Account
            </span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 pt-4 sm:pt-6 pb-20 flex flex-col items-start justify-start">
        <Doctors showNotification={showNotification} />
      </main>

      {/* FOOTER */}
      <footer className="hidden lg:block bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>© 2026 ServiceHub. Built by <span className="font-bold text-slate-900">Azar Ibrahim</span></p>
      </footer>

    </div>
  );
};

export default ServiceHubLayout;
