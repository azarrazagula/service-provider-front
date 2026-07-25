import React, { useState, useRef } from "react";
import gsap from "gsap";
import { mainCategories } from "./data/serviceCategories";
import { Sparkles } from "./common/Icons";

const SelectServiceSection = ({ onSelectCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardContainerRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  // Ultra-Premium GSAP 3D Slide & Parallax Stagger Animation
  const animateSlide = (newIndex, direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const container = cardContainerRef.current;
    const img = imageRef.current;
    const badge = badgeRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const btn = btnRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Step 1: 3D Tilt Exit
    tl.to(container, {
      duration: 0.22,
      x: -direction * 90,
      rotateY: -direction * 14,
      scale: 0.9,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
      },
    });

    // Step 2: Set 3D Entrance Position
    tl.set(container, {
      x: direction * 110,
      rotateY: direction * 16,
      scale: 0.88,
      opacity: 0,
    });

    // Step 3: Spring Entrance Motion with Custom Physics Back Ease
    tl.to(container, {
      duration: 0.52,
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.2)",
    });

    // Step 4: Parallax Image Zoom In
    if (img) {
      tl.fromTo(
        img,
        { scale: 1.25 },
        { scale: 1, duration: 0.55, ease: "power3.out" },
        "-=0.48"
      );
    }

    // Step 5: Sequential Stagger Text Fade & Rise
    const elementsToStagger = [badge, title, desc, btn].filter(Boolean);
    if (elementsToStagger.length > 0) {
      tl.fromTo(
        elementsToStagger,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.32, stagger: 0.05, ease: "power2.out" },
        "-=0.42"
      );
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % mainCategories.length;
    animateSlide(nextIdx, 1);
  };

  const handlePrev = () => {
    const prevIdx =
      (activeIndex - 1 + mainCategories.length) % mainCategories.length;
    animateSlide(prevIdx, -1);
  };

  const handleSelectTab = (idx) => {
    if (idx === activeIndex) return;
    const direction = idx > activeIndex ? 1 : -1;
    animateSlide(idx, direction);
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      // Swiped Left -> Next Card
      handleNext();
    } else if (diff < -45) {
      // Swiped Right -> Prev Card
      handlePrev();
    }
  };

  const currentCategory = mainCategories[activeIndex];

  return (
    <section
      id="select-service"
      className="bg-slate-50 relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Choose Your Service</span>
          </div>

          <h2
            className="font-extrabold tracking-tight text-slate-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Book a trusted provider in minutes.
          </h2>
          <p className="text-sm leading-6 text-slate-600 sm:text-base max-w-xl mx-auto">
            Pick one of our top service categories and see vetted professionals
            ready to help near you.
          </p>
        </div>

        {/* --- MOBILE & IPAD GSAP TOUCH SWIPE CAROUSEL (< lg) --- */}
        <div className="lg:hidden mt-8 space-y-5">
          {/* 3D Perspective Card Wrapper with Touch Swipe Handlers */}
          <div
            className="relative max-w-md mx-auto touch-pan-y"
            style={{ perspective: "1200px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={cardContainerRef}
              style={{ transformStyle: "preserve-3d" }}
              className="will-change-transform"
            >
              <button
                type="button"
                onClick={() => onSelectCategory?.(currentCategory)}
                className="group w-full flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white text-left shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none"
              >
                {/* Card Image with Parallax */}
                <div className="relative w-full overflow-hidden bg-slate-100 h-64 sm:h-72">
                  <img
                    ref={imageRef}
                    src={currentCategory.image}
                    alt={currentCategory.title}
                    className="h-full w-full object-cover object-top will-change-transform"
                  />

                  {/* Floating Rating Badge on Image */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center space-x-1 shadow-md">
                    <span className="text-amber-400">★</span>
                    <span>{currentCategory.rating} / 5.0</span>
                    <span className="text-slate-300 text-[10px] font-medium ml-1">
                      ({currentCategory.reviews})
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        ref={titleRef}
                        className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors whitespace-nowrap"
                      >
                        {currentCategory.title}
                      </h3>
                      <span
                        ref={badgeRef}
                        className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-extrabold text-teal-700 border border-teal-200/80 shrink-0"
                      >
                        {currentCategory.badge}
                      </span>
                    </div>

                    <p
                      ref={descRef}
                      className="text-xs sm:text-sm text-slate-600 leading-relaxed"
                    >
                      {currentCategory.description}
                    </p>
                  </div>

                  {/* Book Now Button */}
                  <div
                    ref={btnRef}
                    className="w-full py-3.5 rounded-2xl bg-teal-800 group-hover:bg-teal-700 text-white font-extrabold text-sm text-center shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-98"
                  >
                    Book Now
                  </div>
                </div>
              </button>
            </div>

            {/* Slide Progress Indicator Dots Only (Arrows & Top Buttons Removed) */}
            <div className="flex items-center justify-center space-x-2.5 mt-5">
              {mainCategories.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectTab(idx)}
                  className={`h-2.5 rounded-full transition-all duration-400 ${activeIndex === idx
                    ? "w-8 bg-teal-700 shadow-xs"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- DESKTOP VIEW GRID (>= lg) --- */}
        <div className="hidden lg:grid mt-12 gap-8 lg:grid-cols-3">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory?.(category)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {/* Card Image */}
              <div className="relative w-full overflow-hidden bg-slate-100 h-72">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors whitespace-nowrap">
                      {category.title}
                    </h3>
                    <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200/60 shrink-0">
                      {category.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center space-x-2 pt-1 text-xs sm:text-sm font-semibold text-slate-700">
                    <span className="text-teal-700 font-bold flex items-center">
                      ★ {category.rating}/5
                    </span>
                    <span className="text-slate-400 font-normal">
                      ({category.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="w-full py-3.5 rounded-2xl bg-teal-800 group-hover:bg-teal-700 text-white font-bold text-sm text-center shadow-sm transition-colors duration-300">
                  Book Now
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectServiceSection;
