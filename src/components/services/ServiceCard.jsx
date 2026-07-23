import React from 'react';
import { Video, Stethoscope, Home, Activity, FileText, Thermometer, ArrowRight, CheckCircle } from '../common/Icons';

const iconMap = {
  Video,
  Stethoscope,
  Home,
  Activity,
  FileText,
  Thermometer,
};

const ServiceCard = ({ service, onSelectService }) => {
  const IconComponent = iconMap[service.iconName] || Stethoscope;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 medical-card-hover flex flex-col justify-between relative group">
      
      {/* Top Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <IconComponent className="w-7 h-7" />
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {service.badge}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-800 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          {service.description}
        </p>

        {/* Key Features list */}
        <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-700">
              <CheckCircle className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Pricing & CTA Button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 block">Consultation Fee</span>
          <span className="text-lg font-extrabold text-teal-900">{service.pricing}</span>
        </div>

        <button
          onClick={() => onSelectService(service)}
          className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center space-x-1.5 border border-teal-200"
        >
          <span>Select Service</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default ServiceCard;
