import React from "react";
import { Search, CheckCircle2, Calendar } from "../common/Icons";

const HowItWorksSection = ({ onOpenLogin, onExploreServices }) => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "1. Search for a service",
      description:
        "Browse through hundreds of services and find exactly what you need in seconds.",
    },
    {
      id: 2,
      icon: CheckCircle2,
      title: "2. Choose a verified provider",
      description:
        "Check profiles, ratings, and reviews of our vetted and background-checked experts.",
    },
    {
      id: 3,
      icon: Calendar,
      title: "3. Schedule & Relax",
      description:
        "Pick a time that works for you, pay securely, and let our pros handle the rest.",
    },
  ];

  return (
    <section className="bg-white pt-16 sm:pt-20">
      {/* 1. HOW IT WORKS STEPS CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-14 sm:mb-20">
          How It Works
        </h2>

        <div className="relative">
          {/* Connecting line behind step circles on desktop */}
          <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-0.5 bg-slate-200/80 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="text-center space-y-4 px-2 group">
                  {/* Step Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200/80 text-teal-700 flex items-center justify-center mx-auto shadow-sm group-hover:shadow-md group-hover:border-teal-300 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-8 h-8 text-teal-700" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-500 max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CTA BANNER ("Ready to get things done?") */}
      <div className="bg-cyan-100/80 border-t border-cyan-200/80 py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ready to get things done?
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers who trust Service Provider for their daily professional needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-all duration-300"
            >
              Get Started Now
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm shadow-sm transition-all duration-300"
            >
              Become a Provider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
