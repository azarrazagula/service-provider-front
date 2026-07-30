import React, { useState, useRef, useEffect } from 'react';
import { Search, CheckCircle2, Calendar, ChevronDown, ArrowLeft } from '../../home/common/Icons';
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
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [confirmedCity, setConfirmedCity] = useState('');
  const [locationsList, setLocationsList] = useState(defaultCities);

  // ── GSAP Typewriter Placeholder Animation ─────────────────────────────
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('Search city or area...');
  const animationTlRef = useRef(null);

  // DOM refs for GSAP
  const containerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  const dtBtnRef = useRef(null);
  const chevronRef = useRef(null);
  const panelRef = useRef(null);

  // ── GSAP Typewriter Letter-by-Letter Animation Effect ─────────────────────
  useEffect(() => {
    if (query.trim() !== '') {
      if (animationTlRef.current) animationTlRef.current.kill();
      return;
    }

    let isCancelled = false;

    if (confirmedCity) {
      const targetText = `City for ${confirmedCity}`;

      const animateConfirmedCity = () => {
        if (isCancelled) return;
        const obj = { len: 0 };
        setAnimatedPlaceholder('');

        const tl = gsap.timeline({
          onComplete: () => {
            if (isCancelled) return;
            gsap.delayedCall(2.2, () => {
              if (isCancelled) return;
              gsap.to(obj, {
                len: 0,
                duration: 0.45,
                ease: 'power1.in',
                onUpdate: () => {
                  setAnimatedPlaceholder(targetText.substring(0, Math.floor(obj.len)));
                },
                onComplete: () => {
                  if (isCancelled) return;
                  animateConfirmedCity();
                },
              });
            });
          },
        });

        animationTlRef.current = tl;

        tl.to(obj, {
          len: targetText.length,
          duration: targetText.length * 0.09,
          ease: 'none',
          onUpdate: () => {
            setAnimatedPlaceholder(targetText.substring(0, Math.ceil(obj.len)));
          },
        });
      };

      animateConfirmedCity();
    } else {
      const defaultText = 'Search city or area...';

      const animateDefaultText = () => {
        if (isCancelled) return;
        const obj = { len: 0 };
        setAnimatedPlaceholder('');

        const tl = gsap.timeline({
          onComplete: () => {
            if (isCancelled) return;
            gsap.delayedCall(2.2, () => {
              if (isCancelled) return;
              gsap.to(obj, {
                len: 0,
                duration: 0.45,
                ease: 'power1.in',
                onUpdate: () => {
                  setAnimatedPlaceholder(defaultText.substring(0, Math.floor(obj.len)));
                },
                onComplete: () => {
                  if (isCancelled) return;
                  animateDefaultText();
                },
              });
            });
          },
        });

        animationTlRef.current = tl;

        tl.to(obj, {
          len: defaultText.length,
          duration: defaultText.length * 0.08,
          ease: 'none',
          onUpdate: () => {
            setAnimatedPlaceholder(defaultText.substring(0, Math.ceil(obj.len)));
          },
        });
      };

      animateDefaultText();
    }

    return () => {
      isCancelled = true;
      if (animationTlRef.current) animationTlRef.current.kill();
      gsap.killTweensOf(animationTlRef.current);
    };
  }, [confirmedCity, query]);

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

  const filteredCities = query.trim()
    ? locationsList.filter((c) =>
      c.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    : locationsList;

  // ── COLLAPSE: search box → 48px icon, D&T expands ────────────────────────
  const collapseSearch = (cityName) => {
    setSelectedCity(cityName);
    setConfirmedCity('');
    if (onSelectLocation) onSelectLocation(cityName);

    const tl = gsap.timeline({ onComplete: () => setSearched(true) });

    tl.to(
      searchInputRef.current,
      {
        opacity: 0, width: 0, flex: '0 0 0px',
        paddingLeft: 0, paddingRight: 0, margin: 0,
        duration: 0.25, ease: 'power3.inOut'
      },
      0
    );

    tl.to(
      searchBoxRef.current,
      {
        width: '48px', height: '48px', flex: '0 0 48px',
        padding: '0px', borderRadius: '14px', justifyContent: 'center',
        duration: 0.25, ease: 'power3.inOut'
      },
      0
    );

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

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(searchInputRef.current, { clearProps: 'all' });
        setSearched(false);
      },
    });

    if (dropdownOpen && panelRef.current) {
      tl.to(panelRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power3.in' }, 0);
      if (chevronRef.current) {
        tl.to(chevronRef.current, { rotate: 0, duration: 0.25, ease: 'power3.in' }, 0);
      }
      setDropdownOpen(false);
    }

    tl.to(
      dtBtnRef.current,
      { opacity: 0, width: '0px', flex: '0 0 0%', duration: 0.22, ease: 'power3.in' },
      0
    );

    tl.to(
      searchBoxRef.current,
      {
        width: '100%', height: 'auto', flex: '1 1 0%',
        padding: '0.375rem', borderRadius: '1rem', justifyContent: 'space-between',
        duration: 0.28, ease: 'power3.out'
      },
      0.08
    );

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
        collapseSearch(cityName);
      }
    } catch (err) {
      console.error('Error verifying location:', err);
      collapseSearch(cityName);
    }
  };

  // ── Search button click handler ───────────────────────────────────────────
  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    if (!searched) {
      const userEnteredLocation = query.trim();
      if (userEnteredLocation) {
        verifyAndSelectLocation(userEnteredLocation);
      }
    } else {
      expandSearch();
    }
  };

  const handleCitySelect = (cityName) => {
    verifyAndSelectLocation(cityName);
  };

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
    expandSearch();
    setIsFullScreenOpen(false);

    if (onSelectDateTime) {
      onSelectDateTime(scheduleData);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto space-y-1.5 sm:space-y-2 relative">

      {/* ── HEADER BANNER TRIGGER SEARCH BOX ───────────────────────────────────────────── */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 w-full min-h-[38px] sm:min-h-[46px] md:min-h-[52px] min-w-0">
        <div
          onClick={() => setIsFullScreenOpen(true)}
          className="flex items-center justify-between bg-white border border-slate-200 hover:border-slate-800 shadow-sm sm:shadow-md rounded-xl sm:rounded-2xl p-1 pl-2.5 sm:p-1.5 sm:pl-4 overflow-hidden flex-1 min-w-0 transition-colors cursor-pointer"
        >
          <input
            type="text"
            readOnly
            value={confirmedCity ? `City for ${confirmedCity}` : query}
            placeholder={query || confirmedCity ? '' : animatedPlaceholder}
            className="flex-1 py-1 sm:py-2 text-xs sm:text-sm font-normal text-slate-600 bg-transparent outline-none placeholder:text-slate-400 min-w-0 cursor-pointer"
            style={{ minWidth: 0 }}
          />
          <button
            type="button"
            className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
            title="Open Search Overlay"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* ── DEDICATED FULL SCREEN SEARCH OVERLAY PAGE ─────────────────────────────────── */}
      {isFullScreenOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col font-sans overflow-hidden animate-fadeIn">

          {/* OVERLAY TOP HEADER BAR */}
          <div className="p-3 sm:p-4 bg-white border-b border-slate-100 shadow-sm flex items-center space-x-2.5">
            {/* Back Arrow Button */}
            <button
              type="button"
              onClick={() => {
                setIsFullScreenOpen(false);
                expandSearch();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* GSAP SEARCH BAR & D&T ANIMATION CONTAINER */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 w-full min-h-[42px]">

                {/* SEARCH BOX — GSAP animation target */}
                <div
                  ref={searchBoxRef}
                  className="flex items-center justify-between bg-slate-100 border border-slate-200 focus-within:border-slate-800 rounded-xl p-1 pl-3 overflow-hidden flex-1 min-w-0 transition-colors"
                >
                  <input
                    ref={searchInputRef}
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setConfirmedCity('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchClick(e);
                      }
                    }}
                    placeholder={query ? '' : animatedPlaceholder}
                    className="flex-1 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400 min-w-0"
                    style={{ minWidth: 0 }}
                  />
                  <button
                    type="button"
                    onClick={handleSearchClick}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                    aria-label={searched ? 'Back to search' : 'Search'}
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* DATE & TIME BUTTON — GSAP expands inside overlay */}
                <div
                  ref={dtBtnRef}
                  className="overflow-hidden shrink-0 min-w-0"
                  style={{ opacity: 0, width: 0, flex: '0 0 0%' }}
                >
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full h-[40px] flex items-center justify-between bg-white border border-blue-200 px-3 rounded-xl shadow-xs cursor-pointer group min-w-0 transition-colors"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <div className="w-6 h-6 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 truncate">Select Date & Time</span>
                    </div>
                    <div ref={chevronRef} className="text-slate-400 pl-1 shrink-0">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* GSAP ANIMATED DATES PANEL */}
          <div
            ref={panelRef}
            style={{ overflow: 'hidden', height: 0, opacity: 0 }}
            className="w-full bg-slate-50 border-b border-slate-200/80 shadow-inner z-20"
          >
            <div className="p-3 sm:p-4 max-w-xl mx-auto">
              <Dates
                currentLocation={selectedCity || 'Chennai'}
                onSelectDateTime={handleDateTimeConfirm}
              />
            </div>
          </div>

          {/* OVERLAY BODY — SUGGESTED SERVICE LOCATIONS (ONLY SHOW WHEN NOT SEARCHED) */}
          {!searched && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Suggested Service Locations</span>
                <span className="text-[11px] text-slate-400 font-normal">{filteredCities.length} available</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xs">
                {filteredCities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleCitySelect(city.name)}
                    className="w-full p-3.5 text-left hover:bg-emerald-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                        {city.name}
                      </div>
                      <div className="text-xs text-slate-400">{city.region}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800">
                        {city.badge || 'Available'}
                      </span>
                      {selectedCity === city.name && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default CollapsibleSearchAndDate;
