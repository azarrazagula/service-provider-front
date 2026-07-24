import React, { useState } from 'react';
import { MapPin, CheckCircle2, Users, Sparkles } from '../common/Icons';

const citiesData = [
  {
    id: 'chennai',
    name: 'Chennai',
    region: 'Capital Region',
    providersCount: '120+ Active Pros',
    doctorsCount: '50+ Doctors',
    techsCount: '70+ Techs',
    badge: 'Hub HQ',
    popularArea: 'Anna Salai, T. Nagar, OMR, Velachery',
    coords: { x: '82%', y: '25%' } // Approximate position on TN map layout
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    region: 'Western Region',
    providersCount: '95+ Active Pros',
    doctorsCount: '40+ Doctors',
    techsCount: '55+ Techs',
    badge: 'Major Hub',
    popularArea: 'RS Puram, Gandhipuram, Peelamedu',
    coords: { x: '25%', y: '52%' }
  },
  {
    id: 'madurai',
    name: 'Madurai',
    region: 'Southern Region',
    providersCount: '80+ Active Pros',
    doctorsCount: '35+ Doctors',
    techsCount: '45+ Techs',
    badge: 'Rapid Growth',
    popularArea: 'Anna Nagar, KK Nagar, Simmakkal',
    coords: { x: '45%', y: '78%' }
  },
  {
    id: 'trichy',
    name: 'Trichy',
    region: 'Central Region',
    providersCount: '65+ Active Pros',
    doctorsCount: '25+ Doctors',
    techsCount: '40+ Techs',
    badge: '24/7 Active',
    popularArea: 'Thillai Nagar, Cantonment, Srirangam',
    coords: { x: '58%', y: '58%' }
  },
  {
    id: 'salem',
    name: 'Salem',
    region: 'North-West Region',
    providersCount: '55+ Active Pros',
    doctorsCount: '20+ Doctors',
    techsCount: '35+ Techs',
    badge: 'Express Service',
    popularArea: 'Fairlands, Junction, Hasthampatti',
    coords: { x: '46%', y: '38%' }
  }
];

const CoverageMapSection = () => {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);

  return (
    <section id="coverage-map" className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Tamil Nadu Coverage Network</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Serving Top Cities in Tamil Nadu
          </h2>

          <p className="text-xs sm:text-base text-slate-400 max-w-xl mx-auto">
            Verified Doctors, certified Electricians, and master Plumbers ready for doorstep & digital consultations across major hubs.
          </p>
        </div>

        {/* MAP VISUAL & CITY DETAILS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          
          {/* LEFT: Interactive Stylized Map Viewport */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/60 border border-slate-700/60 overflow-hidden p-6 flex flex-col justify-between">
            
            {/* Map Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

            {/* Stylized State Outline Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-semibold text-teal-300">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Tamil Nadu State Coverage Map</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                5 Major Hubs
              </span>
            </div>

            {/* MAP NODES & PINS */}
            <div className="relative w-full h-full my-2">
              {citiesData.map((city) => {
                const isActive = selectedCity.id === city.id;

                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all duration-300 z-20"
                    style={{ left: city.coords.x, top: city.coords.y }}
                  >
                    {/* Pulsing ring */}
                    <div className={`relative flex items-center justify-center`}>
                      <span className={`absolute inline-flex h-8 w-8 rounded-full ${
                        isActive ? 'bg-teal-400 opacity-75 animate-ping' : 'bg-slate-500/40'
                      }`} />
                      
                      {/* Pin Circle */}
                      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-teal-500 text-slate-950 ring-4 ring-teal-400/30 scale-110 shadow-lg'
                          : 'bg-slate-800 text-slate-300 border border-slate-600 hover:bg-teal-600 hover:text-white'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>

                      {/* City Name Tooltip on Node */}
                      <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shadow-md ${
                        isActive
                          ? 'bg-teal-600 text-white border border-teal-400 opacity-100 scale-100'
                          : 'bg-slate-900 text-slate-400 border border-slate-700 opacity-80 group-hover:opacity-100'
                      }`}>
                        {city.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Status Bar at bottom of Map */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-medium">Live Provider Dispatch Active</span>
              </span>
              <span className="font-bold text-teal-300">{selectedCity.name} Selected</span>
            </div>

          </div>

          {/* RIGHT: Active Selected City Details Card */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  {selectedCity.region}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedCity.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedCity.name} Hub
              </h3>
              <p className="text-xs text-slate-400">
                Key Neighborhoods Covered: <strong className="text-slate-200">{selectedCity.popularArea}</strong>
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-teal-400 font-semibold">
                  <Users className="w-4 h-4" />
                  <span>Total Providers</span>
                </div>
                <div className="text-lg font-bold text-white">{selectedCity.providersCount}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-teal-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Doctors & Techs</span>
                </div>
                <div className="text-sm font-bold text-slate-200">
                  {selectedCity.doctorsCount} • {selectedCity.techsCount}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-950/60 border border-teal-800/60 text-xs text-teal-300 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Doorstep visits dispatched within 30 mins in {selectedCity.name}.</span>
            </div>

          </div>

        </div>

        {/* 5 CITY SELECTOR CARDS BELOW THE MAP */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {citiesData.map((city) => {
            const isSelected = selectedCity.id === city.id;

            return (
              <button
                key={city.id}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-teal-900/60 border-teal-500 ring-2 ring-teal-500/30 text-white shadow-lg -translate-y-1'
                    : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:border-teal-400/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-teal-300' : 'text-teal-500'}`} />
                    <span className="font-bold text-sm text-white">{city.name}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-teal-300 animate-pulse' : 'bg-slate-600'}`} />
                </div>

                <p className="text-[11px] text-slate-400 truncate">
                  {city.providersCount}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CoverageMapSection;
