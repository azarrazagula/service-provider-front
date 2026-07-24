import React from "react";
import { Users, Award, ShieldCheck, Sparkles } from "../common/Icons";

const TrustBadge = () => {
  const stats = [
    { id: 1, icon: Users, value: "50,000+", label: "Happy Customers Served" },
    {
      id: 2,
      icon: Award,
      value: "1,200+",
      label: "Doctors, Electricians & Plumbers",
    },
    {
      id: 3,
      icon: ShieldCheck,
      value: "100%",
      label: "Background Verified Pros",
    },
    {
      id: 4,
      icon: Sparkles,
      value: "4.95 / 5",
      label: "Platform Trust Rating",
    },
  ];

  return (
    <div className="bg-white border-y border-slate-200/80 py-6 sm:py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center space-x-3 sm:space-x-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100/90 text-teal-800 flex items-center justify-center shrink-0 border border-teal-200 shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
