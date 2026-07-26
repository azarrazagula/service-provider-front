import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2 } from '../../home/common/Icons';

// Google Calendar style upcoming days generator
const upcomingDays = [
  { dayName: 'Today', dayShort: 'MON', dateNum: '27', fullDate: 'Mon, Jul 27' },
  { dayName: 'Tomorrow', dayShort: 'TUE', dateNum: '28', fullDate: 'Tue, Jul 28' },
  { dayName: 'Wed', dayShort: 'WED', dateNum: '29', fullDate: 'Wed, Jul 29' },
  { dayName: 'Thu', dayShort: 'THU', dateNum: '30', fullDate: 'Thu, Jul 30' },
  { dayName: 'Fri', dayShort: 'FRI', dateNum: '31', fullDate: 'Fri, Jul 31' },
  { dayName: 'Sat', dayShort: 'SAT', dateNum: '01', fullDate: 'Sat, Aug 01' },
];

const timeSlots = [
  { id: '09:00 AM', label: '09:00 AM', slotName: 'Morning Slot' },
  { id: '11:30 AM', label: '11:30 AM', slotName: 'Midday Slot' },
  { id: '02:00 PM', label: '02:00 PM', slotName: 'Afternoon Slot' },
  { id: '05:00 PM', label: '05:00 PM', slotName: 'Evening Slot' },
  { id: '08:00 PM', label: '08:00 PM', slotName: 'Night Slot' },
];

const Dates = ({ onSelectDateTime, currentLocation = '' }) => {
  const [selectedDayObj, setSelectedDayObj] = useState(upcomingDays[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);

  const handleConfirmSchedule = () => {
    if (onSelectDateTime) {
      onSelectDateTime({
        date: selectedDayObj.fullDate,
        time: selectedTimeSlot.label,
        formatted: `${selectedDayObj.fullDate} - ${selectedTimeSlot.label}`,
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xl space-y-6">
      
      {/* GOOGLE CALENDAR STYLE HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              Schedule Service Slot
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              For: <span className="text-teal-700 font-bold">{currentLocation || 'Location'}</span>
            </span>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
          <Clock className="w-3 h-3 text-teal-600" />
          <span>July / August</span>
        </span>
      </div>

      {/* GOOGLE CALENDAR HORIZONTAL DATE STRIP */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Day
          </span>
          <span className="text-[11px] font-extrabold text-teal-700">
            {selectedDayObj.fullDate}
          </span>
        </div>

        {/* Scrollable / Flex Calendar Pill Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {upcomingDays.map((item) => {
            const isSelected = selectedDayObj.fullDate === item.fullDate;
            return (
              <button
                key={item.fullDate}
                type="button"
                onClick={() => setSelectedDayObj(item)}
                className={`py-2.5 px-1.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-teal-700 border-teal-700 text-white font-extrabold shadow-md scale-105'
                    : 'bg-slate-50 border-slate-200 hover:bg-teal-50/50 hover:border-teal-300 text-slate-700 font-semibold'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                  {item.dayShort}
                </span>
                <span className="text-sm sm:text-base font-black mt-0.5">
                  {item.dateNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GOOGLE CALENDAR TIME SLOT CHIPS */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Time Slot
          </span>
          <span className="text-[10px] font-semibold text-slate-500">
            {selectedTimeSlot.slotName}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot.id === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedTimeSlot(slot)}
                className={`py-2.5 px-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-teal-50 border-teal-600 text-teal-900 font-extrabold shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-teal-300 text-slate-700 font-medium'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">{slot.label}</div>
                  <div className="text-[9px] text-slate-400 font-normal">{slot.slotName}</div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONFIRM BUTTON */}
      <button
        type="button"
        onClick={handleConfirmSchedule}
        className="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-teal-700/20 transition-all duration-300 active:scale-98"
      >
        <CheckCircle2 className="w-4 h-4 text-teal-300" />
        <span>Confirm {selectedDayObj.dayName} at {selectedTimeSlot.label}</span>
      </button>

    </div>
  );
};

export default Dates;
