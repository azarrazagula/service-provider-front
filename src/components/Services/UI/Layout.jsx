import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../Location/SearchBar';
import Dates from '../Location/Dates';
import { MapPin, Clock, X, Sparkles, LogOut, CheckCircle2, Search } from '../../home/common/Icons';
import { gsap } from 'gsap';

const ServiceHubLayout = ({ currentUser, onLogout, showNotification }) => {
  // Step 1: 'location' | Step 2: 'dates' | Step 3: 'summary'
  const [flowStep, setFlowStep] = useState('location');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const containerRef = useRef(null);
  const locationStepRef = useRef(null);
  const datesStepRef = useRef(null);
  const summaryStepRef = useRef(null);

  // GSAP animation when switching steps
  useEffect(() => {
    if (flowStep === 'dates' && datesStepRef.current) {
      gsap.fromTo(
        datesStepRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' }
      );
    } else if (flowStep === 'summary' && summaryStepRef.current) {
      gsap.fromTo(
        summaryStepRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
      );
    }
  }, [flowStep]);

  // Step 1 -> Step 2: Location selected
  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    
    // GSAP Right to Left collapse animation on Location Search
    if (locationStepRef.current) {
      gsap.to(locationStepRef.current, {
        x: -90,
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

  // Step 2 -> Step 3: Date & Time selected
  const handleDateTimeSelect = (schedule) => {
    setSelectedSchedule(schedule);
    
    if (datesStepRef.current) {
      gsap.to(datesStepRef.current, {
        x: -90,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setFlowStep('summary');
          if (showNotification) {
            showNotification(`Schedule locked for ${selectedLocation} on ${schedule.formatted}`);
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
        scale: 0.9,
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
      
      {/* HEADER: ServiceHub Brand Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Brand Title: ServiceHub */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-600 text-white flex items-center justify-center font-black shadow-md">
              S
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Service<span className="text-teal-700">Hub</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                PRO DASHBOARD
              </span>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                  {currentUser.name}
                </span>
              </div>
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                title="Logout from ServiceHub"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HELPER PROMO BANNER: 60% OFF FOR PLUMBERS (PROMINENTLY HIGHLIGHTED) */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-3.5 sm:py-4 px-4 shadow-md border-b border-teal-700/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* RICH HIGHLIGHT BADGE FOR 60% */}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md animate-pulse">
              🔥 60% OFF
            </span>
            
            <p className="text-xs sm:text-sm font-semibold text-slate-100">
              Exclusive discount available for <span className="font-extrabold text-amber-300 underline decoration-amber-400">Plumbers</span> booking today!
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-[11px] font-bold text-teal-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Limited Time Offer</span>
          </div>

        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* INTERACTIVE LOCATION & DATES FLOW CONTAINER */}
        <div ref={containerRef} className="relative w-full">

          {/* STEP 1: LOCATION SEARCH BAR */}
          {flowStep === 'location' && (
            <div ref={locationStepRef} className="space-y-4">
              <div className="text-center space-y-1.5 max-w-xl mx-auto">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Step 1 of 3: Enter Your Location
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900">
                  Where do you need service?
                </h2>
              </div>

              <SearchBar
                onSelectLocation={handleLocationSelect}
                initialLocation={selectedLocation}
              />
            </div>
          )}

          {/* STEP 2: DATES & TIME SCHEDULER */}
          {flowStep === 'dates' && (
            <div ref={datesStepRef} className="space-y-4">
              {/* Compact location badge header during Step 2 */}
              <div className="flex items-center justify-between max-w-xl mx-auto bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Location</span>
                    <div className="text-xs font-extrabold text-slate-900">{selectedLocation}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFlowStep('location')}
                  className="text-xs font-bold text-teal-700 hover:underline px-2 py-1"
                >
                  Edit
                </button>
              </div>

              <Dates
                currentLocation={selectedLocation}
                onSelectDateTime={handleDateTimeSelect}
              />
            </div>
          )}

          {/* STEP 3: COMBINED SUMMARY DISPLAY WITH RESET X BUTTON */}
          {flowStep === 'summary' && selectedSchedule && (
            <div ref={summaryStepRef} className="max-w-xl mx-auto space-y-6">
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500 shadow-2xl space-y-6 overflow-hidden">
                
                {/* RESET BUTTON X (Positioned on top right) */}
                <button
                  type="button"
                  onClick={handleResetFlow}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 flex items-center justify-center transition-all duration-200 border border-slate-200 shadow-sm group"
                  aria-label="Reset location and date"
                  title="Reset and re-select location & date"
                >
                  <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                <div className="flex items-center space-x-2 text-teal-700 font-extrabold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Service Schedule Locked</span>
                </div>

                {/* SIDE-BY-SIDE SUMMARY: Location AND Date/Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                  {/* Location Card */}
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Selected City</span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">{selectedLocation}</h4>
                      <span className="text-[10px] font-semibold text-teal-700">Verified Coverage Area</span>
                    </div>
                  </div>

                  {/* Date & Time Card */}
                  <div className="flex items-start space-x-3 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Visit Time</span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">{selectedSchedule.formatted}</h4>
                      <span className="text-[10px] font-semibold text-emerald-700">Instant Provider Dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Plumber Promo Reminder inside summary */}
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div className="text-xs text-amber-950 font-semibold">
                    <span className="font-extrabold text-amber-900">60% Plumber Offer Applied!</span> Your booking includes 60% discount on plumbing labor & inspection charges.
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500 font-medium">
                    Need to change your details? Click the <span className="font-bold text-slate-800">X</span> button above to edit location or time.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 ServiceHub. Built by <span className="font-bold text-slate-900">Azar Ibrahim</span></p>
      </footer>

    </div>
  );
};

export default ServiceHubLayout;
