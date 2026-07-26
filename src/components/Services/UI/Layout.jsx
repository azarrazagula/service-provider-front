import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../Location/SearchBar';
import Dates from '../Location/Dates';
import { MapPin, Clock, X, LogOut, CheckCircle2, Menu, User } from '../../home/common/Icons';
import { gsap } from 'gsap';

const ServiceHubLayout = ({ currentUser, onLogout, showNotification }) => {
  // Step flow: 'location' | 'dates' | 'summary'
  const [flowStep, setFlowStep] = useState('location');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const locationStepRef = useRef(null);
  const datesStepRef = useRef(null);
  const summaryStepRef = useRef(null);

  // GSAP animation when switching steps (Same Page Right-to-Left Motion)
  useEffect(() => {
    if (flowStep === 'dates' && datesStepRef.current) {
      gsap.fromTo(
        datesStepRef.current,
        { opacity: 0, x: 90 },
        { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' }
      );
    } else if (flowStep === 'summary' && summaryStepRef.current) {
      gsap.fromTo(
        summaryStepRef.current,
        { opacity: 0, x: 90, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)' }
      );
    }
  }, [flowStep]);

  // Step 1 -> Step 2: Location selected (Right-to-Left Slide Motion)
  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    
    if (locationStepRef.current) {
      gsap.to(locationStepRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setFlowStep('dates');
        },
      });
    } else {
      setFlowStep('dates');
    }
  };

  // Step 2 -> Step 3: Date & Time selected (Right-to-Left Slide to Center Summary)
  const handleDateTimeSelect = (schedule) => {
    setSelectedSchedule(schedule);
    
    if (datesStepRef.current) {
      gsap.to(datesStepRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setFlowStep('summary');
          if (showNotification) {
            showNotification(`Locked ${selectedLocation} for ${schedule.formatted}`);
          }
        },
      });
    } else {
      setFlowStep('summary');
    }
  };

  // Step 3 -> Step 1: Reset flow via X button
  const handleResetFlow = () => {
    if (summaryStepRef.current) {
      gsap.to(summaryStepRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedLocation('');
          setSelectedSchedule(null);
          setFlowStep('location');
        },
      });
    } else {
      setSelectedLocation('');
      setSelectedSchedule(null);
      setFlowStep('location');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* HEADER: ServiceHub BRAND NAME IN CENTER + HAMBURGER MENU */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between relative">
          
          {/* Left Decorative Badge */}
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Live Hub
            </span>
          </div>

          {/* BRAND NAME: ServiceHub CENTERED */}
          <div className="flex-1 flex justify-center items-center">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-700 to-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                S
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Service<span className="text-teal-700">Hub</span>
              </span>
            </div>
          </div>

          {/* RIGHT: HAMBURGER MENU BUTTON */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* HAMBURGER MENU DROPDOWN (Contains User Name & Logout) */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 animate-fadeIn space-y-3">
                {currentUser ? (
                  <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-slate-900 truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate">
                        {currentUser.email || 'Verified Account'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 p-2">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>Guest User</span>
                  </div>
                )}

                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs flex items-center justify-center space-x-2 transition-colors border border-red-200/80"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </header>

      {/* COMPACT RICH COLOR HELPER TEXT BANNER (60% OFF FOR PLUMBERS) */}
      <div className="bg-[#0b2b40] text-white py-2.5 px-4 shadow-sm border-b border-[#143d57]">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-2 text-center text-xs sm:text-sm">
          {/* RICH HIGHLIGHT BADGE */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs shadow-sm">
            ⚡ 60% OFF
          </span>
          <span className="font-semibold text-slate-200">
            Special discount for <span className="font-extrabold text-amber-300">Plumbers</span> booking today!
          </span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center">
        
        {/* INTERACTIVE SAME-PAGE GSAP FLOW */}
        <div ref={containerRef} className="w-full max-w-lg mx-auto">

          {/* STEP 1: SEARCH INPUT ONLY (No Step 1 badge, No "Where do you need", No popular cities) */}
          {flowStep === 'location' && (
            <div ref={locationStepRef} className="w-full">
              <SearchBar
                onSelectLocation={handleLocationSelect}
                initialLocation={selectedLocation}
              />
            </div>
          )}

          {/* STEP 2: GOOGLE CALENDAR STYLE DATE & TIME PICKER */}
          {flowStep === 'dates' && (
            <div ref={datesStepRef} className="w-full space-y-4">
              {/* Compact location indicator pill */}
              <div className="flex items-center justify-between max-w-lg mx-auto bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">{selectedLocation}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setFlowStep('location')}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  Change
                </button>
              </div>

              <Dates
                currentLocation={selectedLocation}
                onSelectDateTime={handleDateTimeSelect}
              />
            </div>
          )}

          {/* STEP 3: DRAGGED CENTER SUMMARY CARD WITH X RESET BUTTON */}
          {flowStep === 'summary' && selectedSchedule && (
            <div ref={summaryStepRef} className="w-full">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500 shadow-2xl space-y-5 overflow-hidden">
                
                {/* RESET BUTTON X ON TOP RIGHT */}
                <button
                  type="button"
                  onClick={handleResetFlow}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 flex items-center justify-center transition-all duration-200 border border-slate-200 shadow-xs group"
                  aria-label="Reset location and date"
                  title="Reset & edit details"
                >
                  <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>

                <div className="flex items-center space-x-2 text-teal-700 font-extrabold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Service Details Confirmed</span>
                </div>

                {/* SIDE-BY-SIDE SUMMARY: Location AND Date/Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Location</span>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedLocation}</div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Date & Time</span>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedSchedule.formatted}</div>
                    </div>
                  </div>
                </div>

                {/* Plumber Offer Notification */}
                <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex items-center space-x-2.5 text-xs text-amber-950 font-semibold">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-black text-amber-900">60% Plumber Offer Applied!</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Click the <span className="font-bold text-slate-700">X</span> button above to edit location or time slot.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>© 2026 ServiceHub. Built by <span className="font-bold text-slate-900">Azar Ibrahim</span></p>
      </footer>

    </div>
  );
};

export default ServiceHubLayout;
