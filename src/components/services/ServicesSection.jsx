import React, { useState } from 'react';
import { servicesData } from '../../data/servicesData';
import ServiceCard from './ServiceCard';
import { Sparkles } from '../common/Icons';

const ServicesSection = ({ onOpenBookingModal }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', '24/7 Available', 'Expert Specialists', 'Home Service', 'Diagnostics'];

  const filteredServices = selectedFilter === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === selectedFilter || selectedFilter === 'All');

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Care Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Premium Medical Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Tailored healthcare solutions built around patient convenience, doctor ethics, and transparent medical care.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedFilter === cat
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onOpenBookingModal}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
