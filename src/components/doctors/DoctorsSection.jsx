import React, { useState } from 'react';
import { doctorsData } from '../../data/doctorsData';
import DoctorCard from './DoctorCard';
import { UserCheck, Search } from '../common/Icons';

const DoctorsSection = ({ onBookDoctor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorsData.filter(
    doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="doctors" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verified Medical Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Top Rated Doctors Available
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Consult with board-certified physicians, cardiologists, and pediatricians online.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Doctors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookDoctor={onBookDoctor}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;
