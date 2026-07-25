import React from "react";
import { mainCategories } from "../../data/serviceCategories";

const SelectServiceSection = ({ onSelectCategory }) => {
  return (
    <section id="select-service" className="bg-slate-50" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-teal-600">
            Choose your service
          </p>
          <h2 className="mt-4 font-semibold tracking-tight text-slate-900" style={{ fontSize: 'var(--text-h2)' }}>
            Book a trusted provider in minutes.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Pick one of our top service categories and see vetted professionals
            ready to help near you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory?.(category)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {/* Card Image */}
              <div className="relative w-full overflow-hidden bg-slate-100 h-56 sm:h-64 lg:h-72">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body & Info */}
              <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {category.title}
                    </h3>
                    <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200/60">
                      {category.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Rating Line */}
                  <div className="flex items-center space-x-2 pt-1 text-xs sm:text-sm font-semibold text-slate-700">
                    <span className="text-teal-700 font-bold flex items-center">
                      ★ {category.rating}/5
                    </span>
                    <span className="text-slate-400 font-normal">
                      ({category.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* STITCH REFERENCE DESIGN: Rounded full-width button inside card padding */}
                <div className="w-full py-3 rounded-xl bg-teal-800 group-hover:bg-teal-700 text-white font-bold text-sm text-center shadow-sm transition-colors duration-300">
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
