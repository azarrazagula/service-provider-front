import React, { useEffect, useRef } from "react";
import { ShieldCheck, Lock, PhoneCall } from "./common/Icons";
import { gsap } from "gsap";

const TrustBadge = () => {
  const badgeSectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = badgeSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (containerRef.current && containerRef.current.children) {
              gsap.fromTo(
                containerRef.current.children,
                { opacity: 0, y: 20, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.14, ease: "power2.out" }
              );
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trustItems = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Verified Professionals",
    },
    {
      id: 2,
      icon: Lock,
      title: "Secure Payments",
    },
    {
      id: 3,
      icon: PhoneCall,
      title: "24/7 Premium Support",
    },
  ];

  return (
    <div ref={badgeSectionRef} className="w-full bg-[#0b2b40] border-y border-[#143d57] py-3 sm:py-4.5 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div ref={containerRef} className="grid grid-cols-3 gap-1 sm:gap-8 items-center justify-between text-center">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-white py-1 px-1 rounded-lg hover:bg-white/5 transition-colors opacity-0"
              >
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-teal-400 shrink-0" />
                <span className="text-[10px] sm:text-sm font-semibold text-white tracking-tight leading-tight sm:whitespace-nowrap">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
