import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CheckCircle2, ShieldCheck, Sparkles, Users } from "./UI/Icons";

const testimonialsData = [
  {
    id: 1,
    name: "Priya Sundaram",
    location: "Anna Nagar, Chennai",
    service: "Cardiologist Consultation",
    badge: "Heart Care",
    rating: 5,
    avatarBg: "bg-teal-600",
    initials: "PS",
    review:
      "Found an expert cardiologist within 10 minutes when my mother had chest tightness. Video consultation was smooth, and the doctor gave immediate guidance. Highly recommended!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Karthik Raja",
    location: "RS Puram, Coimbatore",
    service: "Emergency Electrician",
    badge: "Electrical",
    rating: 5,
    avatarBg: "bg-amber-600",
    initials: "KR",
    review:
      "Emergency short circuit at 9 PM on a Sunday! The electrician arrived in 25 minutes with proper tools, fixed the main breaker board, and gave fair upfront pricing. Fantastic platform!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Anitha Ranganathan",
    location: "KK Nagar, Madurai",
    service: "Dental Care Specialist",
    badge: "Dental Care",
    rating: 5,
    avatarBg: "bg-sky-600",
    initials: "AR",
    review:
      "Booked a dental consultation for severe tooth pain. The dentist was incredibly gentle, explained the diagnosis clearly, and prescribed effective relief right away. Super convenient!",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "Venkatesh Kumar",
    location: "Thillai Nagar, Trichy",
    service: "Master Plumber Service",
    badge: "Plumbing",
    rating: 5,
    avatarBg: "bg-indigo-600",
    initials: "VK",
    review:
      "Major bathroom pipe burst fixed quickly. The master plumber was punctual, professional, and replaced the damaged fitting efficiently with zero mess left behind. Very trustworthy!",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Meenakshi Sharma",
    location: "T. Nagar, Chennai",
    service: "Clinical Nutritionist",
    badge: "Nutrition Care",
    rating: 5,
    avatarBg: "bg-rose-600",
    initials: "MS",
    review:
      "The custom diet plan for weight control and health management has been life-changing! My nutritionist tracks my progress weekly with extreme care and warmth.",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Arunachalam S.",
    location: "Fairlands, Salem",
    service: "Home Physiotherapy",
    badge: "Physiotherapy",
    rating: 5,
    avatarBg: "bg-emerald-600",
    initials: "AS",
    review:
      "Home physiotherapy sessions for my father's post-stroke rehabilitation were outstanding. The physiotherapist was patient, knowledgeable, and punctual every single session.",
    date: "1 month ago",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);
  const sectionHeaderRef = useRef(null);
  const desktopGridRef = useRef(null);
  const ratingSummaryRef = useRef(null);

  const sectionWrapperRef = useRef(null);

  // GSAP On-Scroll Reveal Section Entrance Timeline
  useEffect(() => {
    const el = sectionWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { duration: 0.85, ease: "power2.out" } });

            if (sectionHeaderRef.current && sectionHeaderRef.current.children) {
              tl.fromTo(
                sectionHeaderRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.14 }
              );
            }

            if (desktopGridRef.current && desktopGridRef.current.children) {
              tl.fromTo(
                desktopGridRef.current.children,
                { opacity: 0, y: 40, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.14, ease: "back.out(1.3)" },
                "-=0.4"
              );
            }

            if (ratingSummaryRef.current) {
              tl.fromTo(
                ratingSummaryRef.current,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.75 },
                "-=0.3"
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP 3D Touch Swipe Animation for Mobile
  const animateTestimonialSlide = (newIndex, direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const card = cardRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Exit Current Card
    tl.to(card, {
      duration: 0.2,
      x: -direction * 80,
      rotateY: -direction * 12,
      scale: 0.9,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(newIndex);
      },
    });

    // Prepare Next Entrance Position
    tl.set(card, {
      x: direction * 95,
      rotateY: direction * 14,
      scale: 0.88,
      opacity: 0,
    });

    // Spring Entrance Motion
    tl.to(card, {
      duration: 0.48,
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.2)",
    });
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % testimonialsData.length;
    animateTestimonialSlide(nextIdx, 1);
  };

  const handlePrev = () => {
    const prevIdx =
      (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
    animateTestimonialSlide(prevIdx, -1);
  };

  // Touch Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const currentItem = testimonialsData[activeIndex];

  return (
    <section
      ref={sectionWrapperRef}
      id="testimonials"
      className="bg-slate-50 relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div ref={sectionHeaderRef} className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Real User Feedback & Ratings</span>
          </div>

          <h2
            className="font-extrabold tracking-tight text-slate-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Loved by Thousands Across Tamil Nadu
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Read verified reviews from customers and patients who booked certified doctors and top-rated local experts.
          </p>
        </div>

        {/* --- MOBILE VIEW: GSAP TOUCH SWIPE CAROUSEL (< md) --- */}
        <div className="md:hidden">
          <div
            className="relative max-w-md mx-auto touch-pan-y"
            style={{ perspective: "1000px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={cardRef}
              style={{ transformStyle: "preserve-3d" }}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl flex flex-col justify-between space-y-6 will-change-transform min-h-[260px]"
            >
              {/* TOP ROW: Stars & Category Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(currentItem.rating)].map((_, i) => (
                    <span key={i} className="text-base">
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
                  {currentItem.badge}
                </span>
              </div>

              {/* REVIEW QUOTE TEXT */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{currentItem.review}"
              </p>

              {/* BOTTOM USER INFO ROW */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full ${currentItem.avatarBg} text-white font-extrabold flex items-center justify-center text-xs shadow-md shrink-0`}
                  >
                    {currentItem.initials}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {currentItem.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {currentItem.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Mobile Progress Dots */}
            <div className="flex items-center justify-center space-x-2 mt-5">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (idx === activeIndex) return;
                    const dir = idx > activeIndex ? 1 : -1;
                    animateTestimonialSlide(idx, dir);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-6 bg-teal-700"
                      : "w-2 bg-slate-300"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP GRID VIEW (>= md) */}
        <div ref={desktopGridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
            >
              {/* TOP ROW: Stars & Category Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-base sm:text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
                  {item.badge}
                </span>
              </div>

              {/* REVIEW QUOTE TEXT */}
              <p className="text-sm text-slate-600 leading-relaxed italic relative">
                "{item.review}"
              </p>

              {/* BOTTOM USER INFO ROW */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0`}
                  >
                    {item.initials}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STAT SUMMARY BAR — Single Row on Mobile & iPad/Desktop */}
        <div ref={ratingSummaryRef} className="mt-6 sm:mt-14 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-row items-center justify-between gap-1.5 sm:gap-4 text-left">
          {/* Box 1: Star Rating */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-1 justify-center sm:justify-start">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center text-xs sm:text-xl font-bold shrink-0">
              ★
            </div>
            <div className="min-w-0">
              <div className="text-amber-500 font-extrabold text-xs sm:text-xl leading-none">
                4.95 / 5.0
              </div>
              <p className="text-[9px] sm:text-xs font-bold text-slate-700 mt-0.5 whitespace-nowrap truncate">
                Top Rated
              </p>
            </div>
          </div>

          <div className="h-6 sm:h-10 w-px bg-slate-200/80 shrink-0" />

          {/* Box 2: 100% Verified */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-1 justify-center sm:justify-start">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-teal-600" />
            </div>
            <div className="min-w-0">
              <div className="text-teal-700 font-extrabold text-xs sm:text-xl leading-none">
                100%
              </div>
              <p className="text-[9px] sm:text-xs font-bold text-slate-700 mt-0.5 whitespace-nowrap truncate">
                Verified
              </p>
            </div>
          </div>

          <div className="h-6 sm:h-10 w-px bg-slate-200/80 shrink-0" />

          {/* Box 3: 50,000+ Happy Customers */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-1 justify-center sm:justify-start">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-sky-600" />
            </div>
            <div className="min-w-0">
              <div className="text-teal-700 font-extrabold text-xs sm:text-xl leading-none">
                50,000+
              </div>
              <p className="text-[9px] sm:text-xs font-bold text-slate-700 mt-0.5 whitespace-nowrap truncate">
                Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
