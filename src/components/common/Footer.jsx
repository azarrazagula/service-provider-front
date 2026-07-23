import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  CheckCircle2
} from './Icons';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 sm:pt-12 pb-8 border-t border-slate-800 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10 space-y-8">
        
        {/* 2 BALANCED COLUMNS: User Benefits | 24/7 Contact Support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pb-8 border-b border-slate-800/80">
          
          {/* COLUMN 1: USER BENEFITS */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
              User Benefits
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Instant Doorstep Visit</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Free Service Warranty</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Easy Rescheduling</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: 24/7 CONTACT SUPPORT */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
              24/7 Contact Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-300">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Anna Salai, Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-bold text-white">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="truncate">support@serviceprovider.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* PROMINENT COPYRIGHT & TRUST BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-3 text-center sm:text-left">
          <p className="font-medium text-slate-400">
            Copyright © {new Date().getFullYear()} <strong className="text-white font-extrabold">Service Provider Platform</strong>. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-1.5 text-slate-400">
            <span>Built with care for user trust & safety</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current shrink-0" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
