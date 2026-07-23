import React, { useState, useEffect, useRef } from 'react';
import { topRatedCategories } from '../../data/serviceCategories';
import {
  Stethoscope,
  Zap,
  Droplet,
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  MapPin
} from '../common/Icons';

// Helper component for rendering responsive category sliders
const CategorySliderRow = ({ category, onBook }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); // iPad & Desktop: 3 cards in 1 row

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile: 1 card
      } else if (width < 1024) {
        setItemsPerView(3); // iPad / Tablet: 3 cards with compact gap!
      } else {
        setItemsPerView(4); // Desktop: 4 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = category.providers.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide(); // Swiped left -> Next
    } else if (distance < -50) {
      prevSlide(); // Swiped right -> Prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-sky-500" />;
      default:
        return <UserCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-3 pt-3 pb-6 border-b border-slate-200/80 last:border-0">
      
      {/* Category Row Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-teal-100/80 flex items-center justify-center border border-teal-200 shadow-sm shrink-0">
            {getCategoryIcon(category.iconName)}
          </div>
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
              {category.categoryTitle}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-bold">
              4 Top Rated Verified Professionals
            </p>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        {totalItems > itemsPerView && (
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-slate-300 shadow-md hover:bg-teal-600 hover:border-teal-600 text-slate-700 hover:text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-slate-300 shadow-md hover:bg-teal-600 hover:border-teal-600 text-slate-700 hover:text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sliding Viewport Track */}
      <div
        className="relative overflow-hidden touch-pan-y py-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {category.providers.map((provider) => (
            <div
              key={provider.id}
              className="shrink-0 px-1.5 sm:px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="h-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-4 border border-slate-200 shadow-md hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
                
                {/* Image & Header (h-60 Mobile for full face, h-48 iPad, h-56 Mac/PC) */}
                <div className="space-y-3">
                  <div className="relative h-60 sm:h-48 lg:h-56 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-800 text-white shadow-md uppercase tracking-wider">
                      {provider.badge}
                    </span>

                    {/* Location & Rating */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] sm:text-xs font-bold">
                      <div className="flex items-center space-x-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                        <span className="truncate">{provider.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-slate-900/90 px-2 py-0.5 rounded-full backdrop-blur-md text-amber-400 shrink-0 border border-white/20 shadow-md">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-extrabold">{provider.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-sm sm:text-sm lg:text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {provider.name}
                    </h4>
                    <p className="text-xs sm:text-xs font-extrabold text-teal-800 line-clamp-1">
                      {provider.specialty}
                    </p>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                      {provider.qualification || provider.experience}
                    </p>
                  </div>
                </div>

                {/* Footer details & Action */}
                <div className="pt-3 mt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-xs">
                    <span className="text-slate-600 font-bold truncate">{provider.experience}</span>
                    <span className="font-black text-slate-900 text-xs sm:text-sm">{provider.fee}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBook(provider)}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-xs font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Book Provider</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {totalItems > itemsPerView && maxIndex > 0 && (
        <div className="flex justify-center space-x-2 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-teal-700' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

const TopRatedServicesSection = ({ onBookProvider }) => {
  return (
    <section id="top-rated" className="py-6 sm:py-10 lg:py-16 bg-white relative">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-3.5 sm:px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <UserCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Top Rated Professionals</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Top Rated Services Provider
          </h2>

          {/* Approx 60 Letters Paragraph */}
          <p className="text-xs sm:text-base text-slate-600 font-extrabold max-w-xl mx-auto">
            Connecting you with verified doctors, electricians, and plumbers fast.
          </p>
        </div>

        {/* 3 Categories Line by Line (Doctor, Electrician, Plumber) */}
        <div className="space-y-3">
          {topRatedCategories.map((category) => (
            <CategorySliderRow
              key={category.categoryId}
              category={category}
              onBook={onBookProvider}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopRatedServicesSection;
