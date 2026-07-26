import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2 } from '../../home/common/Icons';

const dateOptions = [
  { id: 'today', label: 'Today', subText: 'Instant Visit' },
  { id: 'tomorrow', label: 'Tomorrow', subText: 'Morning / Evening' },
  { id: 'weekend', label: 'This Weekend', subText: 'Sat / Sun Slots' },
];

const timeSlots = [
  { id: '09:00 AM', label: '09:00 AM', period: 'Morning' },
  { id: '01:00 PM', label: '01:00 PM', period: 'Afternoon' },
  { id: '05:00 PM', label: '05:00 PM', period: 'Evening' },
  { id: '08:00 PM', label: '08:00 PM', period: 'Night' },
];

const Dates = ({ onSelectDateTime, currentLocation = '' }) => {
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');

  const handleConfirm = () => {
    if (onSelectDateTime) {
      onSelectDateTime({
        date: selectedDate,
        time: selectedTime,
        formatted: `${selectedDate} at ${selectedTime}`,
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              Select Visit Date & Time
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Service for: <span className="text-teal-700 font-bold">{currentLocation || 'Selected Location'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Date Options */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Choose Day
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {dateOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedDate(item.label)}
              className={`p-3 rounded-2xl border text-center transition-all duration-200 ${
                selectedDate === item.label
                  ? 'bg-teal-700 border-teal-700 text-white font-extrabold shadow-md scale-102'
                  : 'bg-slate-50 border-slate-200 hover:border-teal-300 text-slate-800 font-semibold'
              }`}
            >
              <div className="text-xs sm:text-sm">{item.label}</div>
              <div
                className={`text-[10px] mt-0.5 font-normal ${
                  selectedDate === item.label ? 'text-teal-100' : 'text-slate-500'
                }`}
              >
                {item.subText}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Choose Time Slot
          </label>
          <span className="text-[10px] text-teal-700 font-semibold flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>30-min window</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setSelectedTime(slot.label)}
              className={`p-2.5 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center ${
                selectedTime === slot.label
                  ? 'bg-teal-50 border-teal-600 text-teal-900 font-extrabold shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-teal-300 text-slate-700 font-medium'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold">{slot.label}</span>
              <span className="text-[10px] text-slate-400 font-normal">{slot.period}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Date & Time Schedule Button */}
      <button
        type="button"
        onClick={handleConfirm}
        className="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-700 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-teal-700/20 transition-all duration-300 transform active:scale-98"
      >
        <CheckCircle2 className="w-5 h-5 text-teal-300" />
        <span>Confirm Schedule ({selectedDate} - {selectedTime})</span>
      </button>
    </div>
  );
};

export default Dates;
