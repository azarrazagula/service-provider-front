import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, CheckCircle2, X } from './Icons';
import { gsap } from 'gsap';

const Navbar = ({ onOpenLogin, currentUser, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const logoRef = useRef(null);
  const dropdownRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  }, []);

  // GSAP animation for dropdown
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { scale: 0.85, opacity: 0, y: -10, transformOrigin: 'top right' },
        { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: 'back.out(1.5)' }
      );
    }
  }, [dropdownOpen]);

  const handleCloseDropdown = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        scale: 0.9,
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setDropdownOpen(false),
      });
    } else {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      <header className={`sticky top-0 ${dropdownOpen ? 'z-[999]' : 'z-50'} bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs relative`}>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-18 sm:h-20">

            {/* Brand Logo */}
            <div ref={logoRef} className="flex items-center space-x-3 cursor-pointer group">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Service <span className="text-teal-600">Provider</span>
              </span>
            </div>

            {/* RIGHT SIDE: LOGIN / USER ICON ONLY (VISIBLE ON DESKTOP 1024px+, HIDDEN ON MOBILE & IPAD) */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => {
                  if (dropdownOpen) {
                    handleCloseDropdown();
                  } else {
                    setDropdownOpen(true);
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
        </div>
      </header>

      {/* FULL ENTIRE SCREEN BACKDROP & DROPDOWN (OUTSIDE HEADER TO COVER 100% OF PAGE) */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-[99999] pointer-events-auto">
          {/* Entire Screen Light Backdrop Overlay (Backside page visible, clicks blocked) */}
          <div
            onClick={handleCloseDropdown}
            className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] animate-fadeIn cursor-pointer"
          />

          {/* Floating Dropdown Card */}
          <div
            ref={dropdownRef}
            className="fixed right-4 sm:right-8 lg:right-16 top-[72px] sm:top-[80px] z-[100000] w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-900 space-y-3 animate-fadeIn"
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
                    handleCloseDropdown();
                    onOpenLogin();
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
                    handleCloseDropdown();
                    setTimeout(() => onLogout(), 150);
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
      {showAccountModal && currentUser && (
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
                {currentUser.name || 'User Account'}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {currentUser.email || 'Verified User'}
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
                  <LogOut className="w-4 h-4" />
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
            <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center font-black text-[10px] shadow-xs">
              S
            </div>
            <span className="text-[11px] font-bold text-slate-900 tracking-tight">
              ServiceHub
            </span>
          </div>

          {/* Account Button */}
          <button
            type="button"
            onClick={() => {
              if (currentUser) {
                setShowAccountModal(true);
              } else {
                onOpenLogin();
              }
            }}
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
    </>
  );
};

export default Navbar;
