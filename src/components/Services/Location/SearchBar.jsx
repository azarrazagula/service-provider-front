import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Calendar, ChevronDown } from '../../home/common/Icons';
import Dates from './Dates';
import { gsap } from 'gsap';

const defaultCities = [
  { id: 'chennai', name: 'Chennai', region: 'Tamil Nadu, India', badge: 'Popular' },
  { id: 'madurai', name: 'Madurai', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'trichy', name: 'Trichy', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'salem', name: 'Salem', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'coimbatore', name: 'Coimbatore', region: 'Tamil Nadu, India', badge: 'Popular' },
];

const CollapsibleSearchAndDate = ({ onSelectLocation, onSelectDateTime, showNotification }) => {
  const [searched, setSearched] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [confirmedCity, setConfirmedCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationsList, setLocationsList] = useState(defaultCities);

  // DOM refs for GSAP
  const containerRef = useRef(null); // outer wrapper — for click-outside
  const searchBoxRef = useRef(null); // GSAP animation target (flex-1 in row)
  const searchInputRef = useRef(null);
  const dtBtnRef = useRef(null);
  const chevronRef = useRef(null);
  const panelRef = useRef(null);

  // ── Fetch service locations from API endpoint ──────────────────────────────
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/alllocations');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data) && result.data.length > 0) {
            setLocationsList(result.data);
          }
        }
      } catch (err) {
        console.error('Error fetching locations from API:', err);
      }
    };
    fetchLocations();
  }, []);

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
    ? locationsList.filter((c) =>
      c.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    : locationsList;

  // ── COLLAPSE: search box → 48px icon, D&T expands ────────────────────────
  const collapseSearch = (cityName) => {
    // cityName is passed directly — no stale closure issue
    setSelectedCity(cityName);
    setConfirmedCity(''); // Clear previous confirmed city while choosing new slot
    setShowSuggestions(false);
    if (onSelectLocation) onSelectLocation(cityName);

    const tl = gsap.timeline({ onComplete: () => setSearched(true) });

    // Fade + collapse input
    tl.to(
      searchInputRef.current,
      {
        opacity: 0, width: 0, flex: '0 0 0px',
        paddingLeft: 0, paddingRight: 0, margin: 0,
        duration: 0.25, ease: 'power3.inOut'
      },
      0
    );

    // Search box shrinks to 48px button
    tl.to(
      searchBoxRef.current,
      {
        width: '48px', height: '48px', flex: '0 0 48px',
        padding: '0px', borderRadius: '14px', justifyContent: 'center',
        duration: 0.25, ease: 'power3.inOut'
      },
      0
    );

    // D&T button expands with slight bounce
    tl.to(
      dtBtnRef.current,
      {
        width: '100%', flex: '1 1 0%', opacity: 1,
        duration: 0.3, ease: 'back.out(1.1)'
      },
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
        gsap.set(searchInputRef.current, { clearProps: 'all' });
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
      {
        width: '100%', height: 'auto', flex: '1 1 0%',
        padding: '0.375rem', borderRadius: '1rem', justifyContent: 'space-between',
        duration: 0.28, ease: 'power3.out'
      },
      0.08
    );

    // Fade in content
    tl.to(
      searchInputRef.current,
      { opacity: 1, width: 'auto', duration: 0.22, ease: 'power2.out' },
      0.22
    );
  };

  // ── Verify Location with Backend API ──────────────────────────────────────
  const verifyAndSelectLocation = async (cityName) => {
    if (!cityName) return;
    try {
      const response = await fetch('http://localhost:5001/api/alllocations/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: cityName }),
      });
      const data = await response.json();

      if (data.success && (data.isSupported || data.data?.matchedCity)) {
        const targetCityName = data.data?.matchedCity?.name || cityName;
        setQuery(targetCityName);
        collapseSearch(targetCityName);
      } else {
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error('Error verifying location:', err);
      // Fallback if offline/network error: proceed with collapse
      collapseSearch(cityName);
    }
  };

  // ── Search button click handler ───────────────────────────────────────────
  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    if (!searched) {
      const userEnteredLocation = query.trim();
      if (!userEnteredLocation) {
        // If empty, open suggestions & focus input instead of defaulting to Chennai
        setShowSuggestions(true);
        if (searchInputRef.current) searchInputRef.current.focus();
        return;
      }
      verifyAndSelectLocation(userEnteredLocation);
    } else {
      expandSearch();
    }
  };

  // ── City suggestion click ─────────────────────────────────────────────────
  const handleCitySelect = (cityName) => {
    setShowSuggestions(false);
    verifyAndSelectLocation(cityName);
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

  const handleDateTimeConfirm = (scheduleData) => {
    const activeCity = selectedCity || scheduleData?.city || query || 'Chennai';
    setConfirmedCity(activeCity);

    // Switch back to search box!
    expandSearch();

    if (onSelectDateTime) {
      onSelectDateTime(scheduleData);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto space-y-4 relative">

      {/* ── TOP ROW ─────────────────────────────────────────────────────── */}
      <div className="flex items-center space-x-2 sm:space-x-3 w-full min-h-[52px] min-w-0">

        {/* SEARCH BOX — GSAP animation target */}
        <div
          ref={searchBoxRef}
          className="flex items-center justify-between bg-white border border-slate-200 hover:border-slate-800 focus-within:border-slate-900 shadow-md rounded-2xl p-1.5 pl-4 overflow-hidden flex-1 min-w-0 transition-colors"
        >
          {/* Input — light text, Enter key support */}
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setConfirmedCity(''); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchClick(e);
              }
            }}
            placeholder="Search city or area..."
            className="flex-1 py-2.5 text-sm font-normal text-slate-600 bg-transparent outline-none placeholder:text-slate-400 min-w-0"
            style={{ minWidth: 0 }}
          />

          {/* Search button — black hover effect */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
            aria-label={searched ? 'Back to search' : 'Search'}
            title={searched ? 'Click to expand search' : 'Search Location'}
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
            className="w-full h-[48px] flex items-center justify-between bg-white border border-slate-200 hover:border-slate-800 px-3 rounded-2xl shadow-md cursor-pointer group min-w-0 transition-colors"
          >
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] border border-blue-200/80 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0 flex-1 truncate">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#2563EB] truncate leading-tight">
                  Select Date & Time
                </div>
              </div>
            </div>
            <div ref={chevronRef} className="text-slate-400 group-hover:text-[#2563EB] pl-1 shrink-0">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* ── CITY SUGGESTIONS DROPDOWN (No icons on list items) ── */}
      {showSuggestions && !searched && (
        <div className="absolute top-[60px] left-0 right-0 bg-white rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-slate-200/90 overflow-hidden z-50">
          <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Suggested Locations</span>
            <span className="text-[#64748B] font-medium">Tamil Nadu</span>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()} // prevent blur before click fires
                onClick={() => handleCitySelect(city.name)}
                className="w-full px-5 py-3 text-left hover:bg-[#EFF6FF]/70 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#2563EB]">
                    {city.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{city.region}</div>
                </div>
                {selectedCity === city.name && (
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
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
            onSelectDateTime={handleDateTimeConfirm}
          />
        </div>
      </div>

      {/* ── SELECTED CITY BADGE BELOW SEARCH BOX (#EFF6FF bg + #2563EB icon + #1D4ED8 text) ── */}
      {confirmedCity && (
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center space-x-1.5 bg-[#EFF6FF] border border-blue-200/80 px-3.5 py-1.5 rounded-xl text-[#1D4ED8] font-bold text-xs sm:text-sm shadow-2xs">
            <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>{confirmedCity}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default CollapsibleSearchAndDate;
