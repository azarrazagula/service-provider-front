import React from "react";

const HowItWorksSection = ({ onOpenLogin, onExploreServices }) => {
  return (
    <section className="bg-white pt-6 sm:pt-12">
      {/* CTA BANNER ("Ready to get things done?") */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white py-14 sm:py-20 text-center relative overflow-hidden shadow-inner">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 relative z-10">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to get things done?
          </h3>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers who trust Service Provider for their daily professional needs & digital consultations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started Now
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm backdrop-blur-md transition-all duration-300"
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
