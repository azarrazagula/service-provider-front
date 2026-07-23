import React from "react";
import {
  Heart,
  ShieldCheck,
  Lock,
  Award,
  Wrench,
  Zap,
  Stethoscope,
} from "../common/Icons";

const PoeticBanner = () => {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="py-12 sm:py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-800 text-white relative overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-teal-800/60 border border-teal-500/40 text-teal-200 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Heart
              className="w-4 h-4 text-teal-400 fill-teal-400/40 shrink-0"
              aria-hidden="true"
            />
            <span>Ethical Healthcare & Verified Home Services</span>
          </div>

          {/* Main Title */}
          <h2
            id="trust-heading"
            className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-teal-50 leading-snug"
          >
            Quality service at your doorstep, trust in every provider.
          </h2>

          {/* Poetic Card Quote */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3.5 sm:space-y-4 shadow-2xl">
            <p className="text-sm sm:text-lg lg:text-xl italic font-serif text-teal-100 leading-relaxed">
              "From healing hands that safeguard your family’s health,"
            </p>
            <p className="text-sm sm:text-lg lg:text-xl italic font-serif text-teal-200 leading-relaxed">
              "To skilled hands that keep your home safe, powered, and flowing
              smoothly."
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-teal-300">
              <span className="flex items-center space-x-1">
                <Stethoscope
                  className="w-5 h-5 text-teal-400 shrink-0"
                  aria-hidden="true"
                />
                <span>Certified Doctors</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <Zap
                  className="w-5 h-5 text-amber-400 shrink-0"
                  aria-hidden="true"
                />
                <span>Master Electricians</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1">
                <Wrench
                  className="w-5 h-5 text-sky-400 shrink-0"
                  aria-hidden="true"
                />
                <span>Expert Plumbers</span>
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-sans not-italic pt-2 max-w-2xl mx-auto leading-relaxed">
              We are your trusted partner, delivering verified, affordable, and
              transparent services for every home.
            </p>
          </div>

          <div className="pt-4 sm:pt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 text-slate-950 font-bold px-6 py-3 shadow-lg shadow-emerald-400/20 hover:bg-emerald-300 transition-colors"
            >
              Book a trusted service now
            </a>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-4 sm:pt-6 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <ShieldCheck
                className="w-6 h-6 text-teal-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  100% Background Verified
                </h4>
                <p className="text-sm sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Medical license checks for doctors and trade certification for
                  electricians and plumbers.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <Lock
                className="w-6 h-6 text-teal-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  Safe & Secure Booking
                </h4>
                <p className="text-sm sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  256-bit SSL encryption and transparent pricing with no hidden
                  doorstep fees.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 hover:bg-white/10 transition-colors">
              <Award
                className="w-6 h-6 text-teal-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  24/7 Service Support
                </h4>
                <p className="text-sm sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Round-the-clock help for doctor consultations, power outages,
                  and plumbing emergencies.
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
