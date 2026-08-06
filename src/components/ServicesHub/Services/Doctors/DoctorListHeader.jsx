import React from 'react';
import { ArrowLeft, Search, User, X } from '../../../home/UI/Icons';
import SearchBar from '../../Location/SearchBar';

const DoctorListHeader = ({
  navigate,
  isScrolled,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  setShowAccountModal,
  showNotification,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
      {/* DESKTOP TOP NAVBAR (>= 1024px) */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between gap-4">
        {/* LEFT: BRAND LOGO */}
        <div className="flex items-center space-x-3 shrink-0">
          <div
            onClick={() => navigate('/services')}
            className="flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Service<span className="text-[#2563EB]">Hub</span>
            </span>
          </div>
        </div>

        {/* CENTER: SEARCHBAR (PRE-FILLED WITH CONFIRMED CITY FROM HOME/SERVICES PAGE) */}
        <div className="flex-1 max-w-xl mx-4">
          <SearchBar showNotification={showNotification} />
        </div>

        {/* RIGHT: ACCOUNT MENU BUTTON */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowAccountModal(true)}
            className="p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 flex items-center justify-center cursor-pointer group"
            title="Account"
          >
            <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET HEADER (< 1024px) */}
      <div className="lg:hidden max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 pr-2">
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* DYNAMIC SCROLL REVEALED TITLE */}
          <div className={`min-w-0 transition-all duration-300 transform ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
              Pediatric Specialists
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (showNotification) showNotification('Link copied to clipboard!');
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Share"
          >
            <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      {/* EXPANDABLE SEARCH INPUT BAR (MOBILE ONLY) */}
      {isSearchOpen && (
        <div className="max-w-4xl mx-auto px-4 pb-3 animate-fadeIn lg:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors by name, degree, specialty..."
              className="w-full bg-slate-100/80 border border-slate-200/80 focus:border-slate-800 rounded-2xl py-2 pl-9 pr-4 text-xs sm:text-sm font-medium text-slate-900 outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListHeader;
