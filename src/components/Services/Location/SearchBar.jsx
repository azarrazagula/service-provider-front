import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2 } from '../../home/common/Icons';

const citiesList = [
  { id: 'chennai', name: 'Chennai', region: 'Tamil Nadu, India', badge: 'Popular' },
  { id: 'madurai', name: 'Madurai', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'trichy', name: 'Trichy', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'salem', name: 'Salem', region: 'Tamil Nadu, India', badge: 'Active' },
  { id: 'coimbatore', name: 'Coimbatore', region: 'Tamil Nadu, India', badge: 'Popular' },
];

const SearchBar = ({ onSelectLocation, initialLocation = '' }) => {
  const [query, setQuery] = useState(initialLocation);
  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter cities matching search query
  const filteredCities = query.trim()
    ? citiesList.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : citiesList;

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
    setShowDropdown(true);
  };

  const handleInputSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      handleCitySelect(query.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Search Input Form */}
      <form onSubmit={handleInputSubmit} className="relative w-full">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/10 shadow-lg transition-all duration-300">
          {/* Left Location Pin */}
          <div className="pl-4 pr-2 text-teal-600 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search city or area..."
            className="w-full py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
          />

          {/* RIGHT SEARCH ICON */}
          <button
            type="submit"
            className="pr-3 pl-2 py-2 text-white shrink-0 flex items-center justify-center"
            aria-label="Search"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95">
              <Search className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* GOOGLE-STYLE CLEAN SEARCH SUGGESTIONS DROPDOWN (No big cards!) */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-40 animate-fadeIn">
            <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Suggested Locations</span>
              <span className="text-teal-700 font-semibold">Tamil Nadu</span>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
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
                        <div className="text-[11px] text-slate-400">
                          {city.region}
                        </div>
                      </div>
                    </div>

                    {selectedCity === city.name ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 group-hover:text-teal-700">
                        {city.badge}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => handleCitySelect(query.trim())}
                  className="w-full px-4 py-3.5 text-left text-xs font-bold text-teal-700 hover:bg-teal-50 flex items-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Use "{query}" as location</span>
                </button>
              )}
            </div>
          </div>
        )}
      </form>

      {/* Selected City Name Displayed Right Below Input */}
      {selectedCity && (
        <div className="flex items-center justify-center space-x-1.5 pt-2 animate-fadeIn">
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

export default SearchBar;
