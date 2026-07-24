import React from "react";
import { mainCategories } from "../../data/serviceCategories";

const SelectServiceSection = ({ onSelectCategory }) => {
  return (
    <section id="select-service" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-teal-600">
            Choose your service
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Book a trusted provider in minutes.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Pick one of our top service categories and see vetted professionals
            ready to help near you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory?.(category)}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <div className="relative h-70 w-full overflow-hidden bg-slate-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <div className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                    {category.badge}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-2xl bg-slate-100 px-3 py-1 font-medium text-slate-700">
                    {category.count}
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl bg-teal-50 px-3 py-1 border">
                    <span className="font-bold text-yellow-400">
                      <span className="text-slate-600 text-xs">
                        {category.rating}
                      </span>{" "}
                      ★
                    </span>
                    <span className="text-teal-700 font-extrabold">
                      {category.reviews}
                    </span>
                  </div>
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
