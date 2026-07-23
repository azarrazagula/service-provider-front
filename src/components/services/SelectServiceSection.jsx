import React, { useState } from 'react';
import { mainCategories } from '../../data/serviceCategories';
import { CheckCircle2, Sparkles } from '../common/Icons';

const SelectServiceSection = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCardClick = (cat) => {
    setActiveCategory(cat.id);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <section id="select-service" className="py-6 sm:py-10 lg:py-16 bg-slate-50 relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl xl:max-w-7xl mx-auto px-3.5 sm:px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Choose Your Required Service</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Which service do you want?
          </h2>

          <p className="text-xs sm:text-base text-slate-600 font-extrabold max-w-2xl mx-auto">
            Select from our verified network of doctors, electricians, and plumbers.
          </p>
        </div>

        {/* 3 Main Service Cards Grid: 1 col on Mobile, 3 cols on iPad & Mac/PC */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3.5 lg:gap-6">
          {mainCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-teal-600 ring-2 sm:ring-4 ring-teal-500/30 shadow-xl -translate-y-1'
                    : 'border-slate-200/90 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-teal-300'
                }`}
              >

                {/* Card Image Container (h-60 on Mobile for full uncropped face, h-48 on iPad, h-56 on Mac/PC) */}
                <div className="relative h-60 sm:h-48 lg:h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-4 lg:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
                  
                  {/* Title & Count */}
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-lg sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-teal-700 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-bold text-teal-700">
                      {cat.count}
                    </p>
                  </div>

                  <p className="text-xs sm:text-xs lg:text-sm text-slate-600 font-medium leading-relaxed text-left">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-xs sm:text-xs lg:text-sm font-bold text-slate-800 truncate">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="truncate">100% Background Verified</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-xs lg:text-sm font-bold text-slate-800 truncate">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="truncate">Transparent Doorstep Rates</span>
                    </div>
                  </div>

                  {/* SELECT SERVICE BUTTON */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleCardClick(cat)}
                      className={`w-full py-3 sm:py-3 px-4 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm lg:text-base transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isSelected
                          ? 'bg-teal-800 text-white shadow-lg ring-2 ring-teal-600'
                          : 'bg-teal-700 hover:bg-teal-800 text-white border border-teal-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-teal-300" />
                          <span>Service Selected</span>
                        </>
                      ) : (
                        <span>Select Service</span>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SelectServiceSection;
