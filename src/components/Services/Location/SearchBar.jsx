import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Calendar, ChevronDown } from '../../home/common/Icons';
import Dates from './Dates';
import { gsap } from 'gsap';

const citiesList = [
  { id: 'chennai', name: 'Chennai', region: 'Tamil Nadu, India', badge: 'Popular' },
  { id: 'madurai', name: 'Madurai', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'trichy', name: 'Trichy', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'salem', name: 'Salem', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'coimbatore', name: 'Coimbatore', region: 'Tamil Nadu, India', badge: 'Popular' },
];

const CollapsibleSearchAndDate = ({ onSelectLocation, onSelectDateTime }) => {
  const [searched, setSearched] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // DOM refs for GSAP
  const containerRef = useRef(null); // outer wrapper — for click-outside
  const searchBoxRef = useRef(null); // GSAP animation target (flex-1 in row)
  const searchInputRef = useRef(null);
  const pinIconRef = useRef(null);
  const dtBtnRef = useRef(null);
  const chevronRef = useRef(null);
  const panelRef = useRef(null);

  // cityRef — always holds the latest selected city (fixes stale closure bug)
  const pendingCityRef = useRef('');

  // ── Click-outside: close suggestion dropdown ──────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredCities = query.trim()
    ? citiesList.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : citiesList;

  // ── COLLAPSE: search box → 48px icon, D&T expands ────────────────────────
  const collapseSearch = (cityName) => {
    // cityName is passed directly — no stale closure issue
    setSelectedCity(cityName);
    setShowSuggestions(false);
    if (onSelectLocation) onSelectLocation(cityName);

    const tl = gsap.timeline({ onComplete: () => setSearched(true) });

    // Fade + collapse pin icon & input together
    tl.to(
      [pinIconRef.current, searchInputRef.current],
      { opacity: 0, width: 0, flex: '0 0 0px',
        paddingLeft: 0, paddingRight: 0, margin: 0,
        duration: 0.25, ease: 'power3.inOut' },
      0
    );

    // Search box shrinks to 48px button
    tl.to(
      searchBoxRef.current,
      { width: '48px', height: '48px', flex: '0 0 48px',
        padding: '0px', borderRadius: '14px', justifyContent: 'center',
        duration: 0.25, ease: 'power3.inOut' },
      0
    );

    // D&T button expands with slight bounce
    tl.to(
      dtBtnRef.current,
      { width: '100%', flex: '1 1 0%', opacity: 1,
        duration: 0.3, ease: 'back.out(1.1)' },
      0.12
    );
  };

  // ── EXPAND: D&T shrinks, search box grows back ───────────────────────────
  const expandSearch = () => {
    setQuery('');
    setSelectedCity('');
    setShowSuggestions(false);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([pinIconRef.current, searchInputRef.current], { clearProps: 'all' });
        setSearched(false);
      },
    });

    // Auto-close date dropdown if open
    if (dropdownOpen && panelRef.current) {
      tl.to(panelRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power3.in' }, 0);
      if (chevronRef.current) {
        tl.to(chevronRef.current, { rotate: 0, duration: 0.25, ease: 'power3.in' }, 0);
      }
      setDropdownOpen(false);
    }

    // D&T shrinks
    tl.to(
      dtBtnRef.current,
      { opacity: 0, width: '0px', flex: '0 0 0%', duration: 0.22, ease: 'power3.in' },
      0
    );

    // Search box expands back (padding: 0.375rem matches p-1.5 — no snap on clearProps)
    tl.to(
      searchBoxRef.current,
      { width: '100%', height: 'auto', flex: '1 1 0%',
        padding: '0.375rem', borderRadius: '1rem', justifyContent: 'space-between',
        duration: 0.28, ease: 'power3.out' },
      0.08
    );

    // Fade in content
    tl.to(
      [pinIconRef.current, searchInputRef.current],
      { opacity: 1, width: 'auto', duration: 0.22, ease: 'power2.out' },
      0.22
    );
  };

  // ── Search button click handler ───────────────────────────────────────────
  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    if (!searched) {
      // Use current query or default
      const city = query.trim() || 'Chennai';
      setQuery(city);
      collapseSearch(city);
    } else {
      expandSearch();
    }
  };

  // ── City suggestion click ─────────────────────────────────────────────────
  const handleCitySelect = (cityName) => {
    setQuery(cityName);
    setShowSuggestions(false);
    // Pass cityName directly — avoids stale query state closure
    collapseSearch(cityName);
  };

  // ── Date & Time panel toggle ──────────────────────────────────────────────
  const toggleDropdown = () => {
    if (!searched || !panelRef.current) return;

    if (!dropdownOpen) {
      const targetHeight = panelRef.current.scrollHeight || 'auto';
      gsap.to(panelRef.current, {
        height: targetHeight, opacity: 1, duration: 0.55, ease: 'power3.out',
        onComplete: () => gsap.set(panelRef.current, { height: 'auto' }),
      });
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotate: 180, duration: 0.4, ease: 'power3.out' });
      }
      setDropdownOpen(true);
    } else {
      gsap.to(panelRef.current, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotate: 0, duration: 0.35, ease: 'power3.in' });
      }
      setDropdownOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto space-y-4 relative">

      {/* ── TOP ROW ─────────────────────────────────────────────────────── */}
      <div className="flex items-center space-x-2 sm:space-x-3 w-full min-h-[52px] min-w-0">

        {/* SEARCH BOX — GSAP animation target */}
        <div
          ref={searchBoxRef}
          className="flex items-center justify-between bg-white border-2 border-slate-200 focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/10 shadow-lg rounded-2xl p-1.5 overflow-hidden flex-1 min-w-0"
        >
          {/* Pin icon */}
          <div ref={pinIconRef} className="pl-2 pr-1.5 text-teal-600 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>

          {/* Input */}
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search city or area..."
            className="flex-1 py-2.5 text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400 min-w-0"
            style={{ minWidth: 0 }}
          />

          {/* Search button */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0 cursor-pointer"
            aria-label={searched ? 'Back to search' : 'Search'}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* DATE & TIME BUTTON — starts hidden, GSAP expands */}
        <div
          ref={dtBtnRef}
          className="overflow-hidden shrink-0 min-w-0"
          style={{ opacity: 0, width: 0, flex: '0 0 0%' }}
        >
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full h-[48px] flex items-center justify-between bg-white border-2 border-slate-200 hover:border-teal-600 px-3 rounded-2xl shadow-lg cursor-pointer group min-w-0"
          >
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0 flex-1 truncate">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-teal-800 truncate leading-tight">
                  Select Date & Time
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  For: <span className="text-teal-700 font-bold">{selectedCity || 'Location'}</span>
                </div>
              </div>
            </div>
            <div ref={chevronRef} className="text-slate-400 group-hover:text-teal-700 pl-1 shrink-0">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* ── CITY SUGGESTIONS DROPDOWN ──────────────────────────────────────
           Positioned absolute relative to containerRef (no overflow clip issues) */}
      {showSuggestions && !searched && (
        <div className="absolute top-[60px] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50">
          <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Suggested Locations</span>
            <span className="text-teal-700 font-semibold">Tamil Nadu</span>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()} // prevent blur before click fires
                onClick={() => handleCitySelect(city.name)}
                className="w-full px-4 py-3 text-left hover:bg-teal-50/60 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-900">
                      {city.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{city.region}</div>
                  </div>
                </div>
                {selectedCity === city.name && (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── DATE PANEL ─────────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        style={{ overflow: 'hidden', height: 0, opacity: 0 }}
        className="w-full"
      >
        <div className="pt-2">
          <Dates
            currentLocation={selectedCity || 'Chennai'}
            onSelectDateTime={onSelectDateTime}
          />
        </div>
      </div>

      {/* ── SELECTED LOCATION BADGE — only after collapse animation ──────── */}
      {searched && selectedCity && (
        <div className="flex items-center justify-center space-x-1.5 pt-1">
          <span className="text-xs text-slate-400 font-medium">Selected Location:</span>
          <span className="inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-teal-100 text-teal-900 font-extrabold text-xs border border-teal-200">
            <MapPin className="w-3 h-3 text-teal-700" />
            <span>{selectedCity}</span>
          </span>
        </div>
      )}

    </div>
  );
};

export default CollapsibleSearchAndDate;
