import React from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  WhatsApp,
  Instagram,
  Facebook,
  YouTube
} from './Icons';

const LocationMapContactSection = () => {
  return (
    <section id="location-map" className="py-10 sm:py-14 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LIGHT MAP CONTAINER WITH EMBEDDED MAP */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white mb-8 sm:mb-10">
          
          {/* Top-Left Open in Maps Button */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <a
              href="https://maps.google.com/?q=Anna+Salai+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md text-teal-800 font-bold text-xs shadow-md border border-slate-200 hover:bg-teal-50 transition-all flex items-center space-x-1.5"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />
              <span>Open in Maps ↗</span>
            </a>
          </div>

          {/* Embedded Google Map iframe */}
          <iframe
            title="Service Provider Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922114704085!2d80.2586!3d13.0604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526615b13689cb%3A0xb35a00d36c2e3a1f!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-100"
          />

        </div>

        {/* BELOW MAP: LARGE BOLD CONTACT & LOCATION DETAILS */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
          
          {/* LEFT COLUMN: BRAND LOGO & TAGLINE */}
          <div className="lg:w-5/12 space-y-3 text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8 w-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Service Provider
              </span>
            </div>

            <div className="pt-1 space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-teal-800 uppercase tracking-wider">
                MULTI-SERVICE PROVIDER PLATFORM
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide uppercase">
                VERIFIED DOCTORS | CERTIFIED ELECTRICIANS | MASTER PLUMBERS
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT & ADDRESS */}
          <div className="lg:w-6/12 space-y-4 text-left w-full">
            
            {/* PHONE NUMBERS */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Direct Phone & WhatsApp</span>
                <span className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                  +91 90471 20120, +91 90471 13114
                </span>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Official Support Email</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  support@serviceprovider.com
                </span>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Headquarters & Hubs</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                  Anna Salai, Chennai • Coimbatore • Madurai • Trichy • Salem - 600 002.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT FLOATING SOCIAL MEDIA ICONS */}
          <div className="flex lg:flex-col items-center justify-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto">
            <a
              href="https://wa.me/919047120120"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
              aria-label="WhatsApp"
            >
              <WhatsApp className="w-5 h-5" />
            </a>
            <a
              href="#instagram"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#facebook"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#youtube"
              className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
              aria-label="YouTube"
            >
              <YouTube className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationMapContactSection;
