import React, { useState } from 'react';
import { User, Menu, X, LogOut } from './Icons';

const Navbar = ({ onOpenLogin, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* LEFT SIDE: Brand Logo / Service Name */}
          <div className="flex items-center space-x-3 cursor-pointer group">

            <div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Service Provider
              </span>

            </div>
          </div>

          {/* CENTER: Desktop Navigation Links (Only Home) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            <a
              href="#home"
              className="px-6 py-2 rounded-full text-sm font-semibold text-teal-900 bg-white shadow-sm border border-teal-100 transition-all hover:shadow"
            >
              Home
            </a>
          </nav>

          {/* RIGHT SIDE: Desktop Login / User Status */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-teal-50/80 border border-teal-200/80 pl-2 pr-3 py-1.5 rounded-full shadow-sm">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs uppercase shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.name || 'User'}
                  </span>
                  <span className="text-[10px] text-teal-700 font-medium">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="group flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-teal-50 border border-teal-200 hover:bg-teal-600 hover:border-teal-600 transition-all duration-300 shadow-sm"
                aria-label="User Login"
              >
                <div className="w-8 h-8 rounded-full bg-teal-100 group-hover:bg-white text-teal-700 group-hover:text-teal-700 flex items-center justify-center border border-teal-300 transition-all">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800 group-hover:text-white transition-colors">
                  Login
                </span>
              </button>
            )}
          </div>

          {/* MOBILE & IPAD HAMBURGER TOGGLE BUTTON */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-teal-50 border border-slate-200 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE & IPAD RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-semibold text-teal-800 bg-teal-50 text-center"
          >
            Home
          </a>

          {/* USER / LOGIN BUTTON INSIDE HAMBURGER DRAWER */}
          <div className="pt-2">
            {currentUser ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm uppercase">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-md transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

