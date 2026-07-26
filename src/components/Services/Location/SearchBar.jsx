import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2 } from '../../home/common/Icons';

const citiesList = [
  { id: 'chennai', name: 'Chennai', badge: 'Popular' },
  { id: 'madurai', name: 'Madurai', badge: 'Active' },
  { id: 'trichy', name: 'Trichy', badge: 'Active' },
  { id: 'salem', name: 'Salem', badge: 'Active' },
  { id: 'coimbatore', name: 'Coimbatore', badge: 'Popular' },
];

const SearchBar = ({ onSelectLocation, initialLocation = '' }) => {
  const [query, setQuery] = useState(initialLocation);
  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    setQuery(cityName);
    setShowDropdown(false);
    if (onSelectLocation) {
      onSelectLocation(cityName);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleInputSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      handleCitySelect(query.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Search Input Container */}
      <form onSubmit={handleInputSubmit} className="relative w-full">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/10 shadow-lg transition-all duration-300">
          {/* Location Marker Icon (Left) */}
          <div className="pl-4 pr-2 text-teal-600 shrink-0">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Search Input Field */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search city or area (e.g. Chennai, Madurai)..."
            className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400 placeholder:font-normal"
          />

          {/* Search Icon on the RIGHT */}
          <button
            type="submit"
            className="pr-4 pl-3 py-2 text-teal-700 hover:text-teal-800 transition-colors shrink-0 flex items-center justify-center"
            aria-label="Submit Search"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>

        {/* Cities Dropdown Panel (Visible on Touch/Click) */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 sm:p-4 z-30 animate-fadeIn">
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Your City
              </span>
              <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                Tamil Nadu
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {citiesList.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleCitySelect(city.name)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-200 ${
                    selectedCity === city.name
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-teal-50/50 hover:border-teal-200 text-slate-700 font-semibold'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{city.name}</span>
                  {selectedCity === city.name ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <span className="text-[9px] text-slate-400 font-normal">
                      {city.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* City Chips Row (Visible for direct touch) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="text-xs font-bold text-slate-500 mr-1">Popular Cities:</span>
        {citiesList.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => handleCitySelect(city.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 border ${
              selectedCity === city.name
                ? 'bg-teal-800 text-white border-teal-800 shadow-md scale-105'
                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:text-teal-700 shadow-xs'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* Selected City Name Displayed Right Below the Input Field */}
      {selectedCity && (
        <div className="flex items-center justify-center space-x-2 pt-1 animate-fadeIn">
          <span className="text-xs text-slate-500 font-medium">Selected Location:</span>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-teal-100/90 text-teal-900 font-extrabold text-xs border border-teal-300/80 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>{selectedCity}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
