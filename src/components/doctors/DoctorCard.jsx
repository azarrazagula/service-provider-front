import React from 'react';
import { Star, Clock, MapPin, Video } from '../common/Icons';

const DoctorCard = ({ doctor, onBookDoctor }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 medical-card-hover flex flex-col justify-between relative group">
      
      {/* Top Header: Image & Quick Details */}
      <div className="flex items-start space-x-4 mb-5">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-teal-100 shadow-sm">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {doctor.availableToday && (
            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" title="Available Today" />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-1.5">
            <span className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3 h-3 fill-current mr-1" />
              {doctor.rating}
            </span>
            <span className="text-xs text-slate-400">({doctor.reviewsCount} reviews)</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
            {doctor.name}
          </h3>

          <p className="text-xs font-semibold text-teal-700">{doctor.specialty}</p>
          <p className="text-xs text-slate-500">{doctor.qualification}</p>
        </div>
      </div>

      {/* Hospital & Experience */}
      <div className="space-y-2 mb-5 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-teal-600 mr-1.5 shrink-0" />
            {doctor.hospital}
          </span>
          <span className="font-semibold text-slate-900">{doctor.experience}</span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
          <span className="flex items-center text-slate-500">
            <Clock className="w-3.5 h-3.5 text-teal-600 mr-1.5 shrink-0" />
            Next Slot:
          </span>
          <span className="font-semibold text-teal-800">{doctor.nextSlot}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {doctor.tags.map((tag, i) => (
          <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-teal-50/60 text-teal-800 border border-teal-100">
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Pricing & Action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Fee</span>
          <span className="text-lg font-bold text-slate-900">{doctor.fee}</span>
        </div>

        <button
          onClick={() => onBookDoctor(doctor)}
          className="px-5 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center space-x-2"
        >
          <Video className="w-4 h-4" />
          <span>Consult Now</span>
        </button>
      </div>

    </div>
  );
};

export default DoctorCard;
