import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../Location/SearchBar';
import { X, User, CheckCircle2, ArrowRight } from '../../home/common/Icons';
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

  const containerRef = useRef(null);
  const drawerRef = useRef(null);
  const headerImageRef = useRef(null);
  const headerTextRef = useRef(null);

  // GSAP 3D Slide & Flip Right-to-Left Animation for Header Images & Synced Text
  useEffect(() => {
    const interval = setInterval(() => {
      const imgEl = headerImageRef.current;
      const textEl = headerTextRef.current;
      if (!imgEl) return;

      // Animate text fade out
      if (textEl) {
        gsap.to(textEl, { opacity: 0, y: -4, duration: 0.25, ease: 'power1.in' });
      }

      // Slide & flip out image to left
      gsap.to(imgEl, {
        x: -45,
        rotationY: -90,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentImageIndex((prev) => (prev + 1) % serviceSlides.length);

          // Animate text slide in cleanly from bottom
          if (textEl) {
            gsap.fromTo(
              textEl,
              { opacity: 0, y: 6 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
            );
          }

          // Slide & flip in image from right
          gsap.fromTo(
            imgEl,
            { x: 45, rotationY: 90, opacity: 0 },
            { x: 0, rotationY: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.3)' }
          );
        },
      });
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
      <div className="lg:hidden w-full bg-[#40826D] text-white p-4 sm:p-5 pb-2 sm:pb-3 shadow-md transition-colors relative overflow-hidden space-y-2">
        {/* TOP: SearchBar */}
        <div className="w-full max-w-xl mx-auto">
          <SearchBar showNotification={showNotification} />
        </div>

        {/* BELOW SEARCHBAR: Poster Content */}
        <div className="max-w-xl mx-auto flex items-stretch justify-between min-h-[110px]">
          {/* Left Side: Text directly under SearchBar, Book Now 4px above bottom */}
          <div className="flex-1 pr-3 flex flex-col justify-between pt-2 z-10">
            {/* Text block right below SearchBar (Rich Multi-color Palette) */}
            <div ref={headerTextRef} className="space-y-0.5" style={{ opacity: 1 }}>
              {/* Category Tag: Warm Amber Gold */}
              <div className="text-[11px] sm:text-xs font-bold text-amber-300 tracking-wide">
                {serviceSlides[currentImageIndex].line2}
              </div>
              {/* Headline: Crisp Bold Pure White */}
              <div className="text-sm sm:text-base font-black text-white leading-snug drop-shadow-sm">
                {serviceSlides[currentImageIndex].line1}
              </div>
              {/* Description: Soft Light Mint Green */}
              <div className="text-[11px] sm:text-xs text-emerald-100/90 font-medium">
                {serviceSlides[currentImageIndex].line3}
              </div>
            </div>

            {/* Book now -> (Warm Amber Gold Accent) */}
            <div className="flex items-center space-x-1.5 pt-2 pb-[10px] text-xs sm:text-sm font-bold text-amber-300 cursor-pointer hover:text-amber-200 transition-colors">
              <span>Book now</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
            </div>
          </div>

          {/* Right Side: Professional Image touching bottom-right corner (Enlarged) */}
          <div className="shrink-0 w-32 sm:w-40 h-36 sm:h-44 flex items-end justify-center relative overflow-visible self-end -mb-3 -mr-1" style={{ perspective: 1000 }}>
            <img
              ref={headerImageRef}
              src={serviceSlides[currentImageIndex].image}
              alt="Service Professional"
              className="w-full h-full object-contain filter drop-shadow-2xl scale-150 object-bottom"
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        </div>
      </div>

      {/* TOP NAVIGATION BAR FOR DESKTOP ONLY (>= 1024px) */}
      <div className={`hidden lg:block sticky top-0 ${menuOpen ? 'z-[999]' : 'z-40'}`}>
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between relative">

            {/* BRAND HEADER (DESKTOP) */}
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Service<span className="text-[#2563EB]">Hub</span>
                </span>
              </div>
            </div>

            {/* RIGHT: LOGIN / USER ICON ONLY (VISIBLE ON DESKTOP 1024px+, HIDDEN ON MOBILE & IPAD) */}
            <div className="relative hidden lg:block">
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

      {/* URBANCOMPANY-STYLE MOBILE & IPAD BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around py-2 px-6 max-w-sm mx-auto">
          {/* Logo / Brand Item (ServiceHub) */}
          <div className="flex flex-col items-center justify-center space-y-1 cursor-pointer group">
            <div className="w-5 h-5 text-black flex items-center justify-center font-bold text-[14px]">
              SH
            </div>
            <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 tracking-tight">
              ServiceHub
            </span>
          </div>

          {/* Account Details Button */}
          <button
            type="button"
            onClick={() => setShowAccountModal(true)}
            className="flex flex-col items-center justify-center space-y-1 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-center p-1 rounded-lg transition-all duration-300 group-hover:bg-blue-50/80 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]">
              <User className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-medium text-slate-600 group-hover:text-blue-600">
              Account
            </span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 flex flex-col items-center justify-start">
        <div ref={containerRef} className="hidden lg:block w-full max-w-xl mx-auto">
          <SearchBar showNotification={showNotification} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="hidden lg:block bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>© 2026 ServiceHub. Built by <span className="font-bold text-slate-900">Azar Ibrahim</span></p>
      </footer>

    </div>
  );
};

export default ServiceHubLayout;
