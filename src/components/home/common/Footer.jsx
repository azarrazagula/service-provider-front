import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const footerContentRef = useRef(null);

  useEffect(() => {
    if (footerContentRef.current && footerContentRef.current.children) {
      gsap.fromTo(
        footerContentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-8 sm:py-12 lg:py-16">
      <div ref={footerContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

          {/* LEFT COLUMN: Brand Name & Tagline */}
          <div className="md:col-span-5 space-y-2.5 sm:space-y-4 text-left">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">
              Service Provider
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Connecting households with reliable, verified professional services across the country. Your trust, our commitment.
            </p>
          </div>

          {/* RIGHT COLUMNS: Navigation Links (Services, Company, Legal) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-left pt-2 md:pt-0">
            {/* Column 1: Services */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider">
                Services
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#select-service" className="hover:text-teal-700 transition-colors">
                    Consultations
                  </a>
                </li>
                <li>
                  <a href="#select-service" className="hover:text-teal-700 transition-colors">
                    Maintenance
                  </a>
                </li>
                <li>
                  <a href="#select-service" className="hover:text-teal-700 transition-colors">
                    Cleaning
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider">
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#home" className="hover:text-teal-700 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#home" className="hover:text-teal-700 transition-colors">
                    Become a Provider
                  </a>
                </li>
                <li>
                  <a href="#home" className="hover:text-teal-700 transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wider">
                Legal
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <a href="#home" className="hover:text-teal-700 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#home" className="hover:text-teal-700 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-8 pt-4 sm:mt-12 sm:pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-left text-xs text-slate-500">
          <p>© 2026 ServiceHub. All rights reserved.</p>
          <p className="font-medium text-slate-600">
            Built by <span className="font-bold text-slate-900">Azar Ibrahim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
