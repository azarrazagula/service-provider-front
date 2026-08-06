import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorIconImg from '../../../assets/DoctorIcon.webp';

const Doctors = () => {
  const navigate = useNavigate();

  // Clear permission token whenever user is on the main services page
  useEffect(() => {
    sessionStorage.removeItem('allowDoctorListAccess');
  }, []);

  const handleCardClick = () => {
    sessionStorage.setItem('allowDoctorListAccess', 'true');
    navigate('/services/doctor');
  };

  return (
    <div className="w-full flex justify-start items-start py-4 sm:py-6 font-sans animate-fadeIn">
      
      {/* RESPONSIVE COMPACT DOCTOR CARD */}
      <div
        onClick={handleCardClick}
        className="bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-2.5 sm:p-3 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105"
      >
        {/* Responsive Doctor Icon Image Container */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-white p-1.5 sm:p-2 shadow-2xs flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
          <img
            src={doctorIconImg}
            alt="Doctor"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Doctor Name */}
        <span className="text-[11px] sm:text-xs md:text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
          Doctor
        </span>
      </div>

    </div>
  );
};

export default Doctors;
