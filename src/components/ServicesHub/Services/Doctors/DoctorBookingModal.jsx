import React from 'react';
import { X, ShieldCheck, Star, PhoneCall, Video, ShoppingCart } from '../../../home/UI/Icons';

const DoctorBookingModal = ({
  selectedDoctor,
  onClose,
  consultationType,
  setConsultationType,
  selectedTimeSlot,
  setSelectedTimeSlot,
  timeSlots,
  bookingLoading,
  handleAddToCart,
}) => {
  if (!selectedDoctor) return null;

  const audioFee = selectedDoctor.audioCallFee || 300;
  const videoFee = selectedDoctor.videoCallFee || selectedDoctor.fee || 500;
  const currentFee =
    consultationType === 'audioCall'
      ? audioFee
      : consultationType === 'videoCall'
        ? videoFee
        : (selectedDoctor.fee || 500);

  return (
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-5 sm:p-6 space-y-5 my-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Doctor Profile Header */}
        <div className="flex items-center space-x-3.5 pr-8">
          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1.5 flex-wrap">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">{selectedDoctor.name}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 inline-block" />
            </div>
            <p className="text-xs font-medium text-slate-600 leading-tight">{selectedDoctor.degree}</p>
            <p className="text-[11px] font-semibold text-emerald-600">{selectedDoctor.experience}</p>
            <div className="flex items-center space-x-1 pt-0.5 text-xs font-medium text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{selectedDoctor.rating || '4.9'} rating</span>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1 border border-slate-100">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">About Specialist</div>
          <p className="text-xs text-slate-700 font-normal leading-relaxed">{selectedDoctor.about}</p>
        </div>

        {/* 1. SELECT CONSULTATION TYPE */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
            1. Select Consultation Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Audio Call Option */}
            <button
              type="button"
              disabled={selectedDoctor.audioCallAvailable === false}
              onClick={() => setConsultationType(consultationType === 'audioCall' ? null : 'audioCall')}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${consultationType === 'audioCall'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/20'
                : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <PhoneCall className={`w-4 h-4 sm:w-5 sm:h-5 ${consultationType === 'audioCall' ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold text-slate-900">₹{audioFee}</span>
              </div>
              <div className="pt-2">
                <div className="text-xs font-medium text-slate-900">Audio Call</div>
              </div>
            </button>

            {/* Video Call Option */}
            <button
              type="button"
              disabled={selectedDoctor.videoCallAvailable === false}
              onClick={() => setConsultationType(consultationType === 'videoCall' ? null : 'videoCall')}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${consultationType === 'videoCall'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/20'
                : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <Video className={`w-4 h-4 sm:w-5 sm:h-5 ${consultationType === 'videoCall' ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold text-slate-900">₹{videoFee}</span>
              </div>
              <div className="pt-2">
                <div className="text-xs font-medium text-slate-900">Video Call</div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. SELECT TIME SLOT */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
            2. Select Time Slot
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Array.isArray(selectedDoctor?.availableTimeSlots) && selectedDoctor.availableTimeSlots.length > 0
              ? selectedDoctor.availableTimeSlots
              : timeSlots
            ).map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTimeSlot(slot)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${selectedTimeSlot === slot
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="button"
            disabled={bookingLoading}
            onClick={handleAddToCart}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer hover:scale-[1.01] disabled:opacity-50"
          >
            {bookingLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Book Session • ₹{currentFee}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingModal;
