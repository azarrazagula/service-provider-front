import React from 'react';
import { Heart, ShieldCheck, Lock, Award, Wrench, Zap, Stethoscope } from '../common/Icons';

const PoeticBanner = () => {
  return (
    <section id="trust" className="py-12 sm:py-16 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-teal-800/60 border border-teal-500/40 text-teal-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 fill-teal-400/40 shrink-0" />
            <span>Ethical Healthcare & Verified Home Services</span>
          </div>

          {/* Main Title */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-teal-50 leading-snug">
            "Quality Service at Your Doorstep. Trust in Every Provider."
          </h2>

          {/* Poetic Card Quote */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3.5 sm:space-y-4 shadow-2xl">
            <p className="text-sm sm:text-lg lg:text-xl italic font-serif text-teal-100 leading-relaxed">
              "From healing hands that safeguard your family’s health,"
            </p>
            <p className="text-sm sm:text-lg lg:text-xl italic font-serif text-teal-200 leading-relaxed">
              "To skilled hands that keep your home safe, powered, and flowing smoothly."
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-teal-300">
              <span className="flex items-center space-x-1">
                <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Certified Doctors</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Master Electricians</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <Wrench className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Expert Plumbers</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans not-italic pt-1 sm:pt-2 max-w-2xl mx-auto leading-relaxed">
              We stand as your all-in-one trusted partner, ensuring every household receives verified, affordable, and transparent services whenever they need them.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-4 sm:pt-6 text-left">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">100% Background Verified</h4>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  Medical license checks for doctors and trade certification for electricians & plumbers.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Safe & Secure Booking</h4>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  256-bit SSL data encryption with zero hidden doorstep costs.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">24/7 Service Support</h4>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                  Round-the-clock emergency support for doctor consultations, power outages & pipe leaks.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PoeticBanner;
