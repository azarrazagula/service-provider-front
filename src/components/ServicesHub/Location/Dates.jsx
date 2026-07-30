import React, { useState } from 'react';
import { Clock, CheckCircle2 } from '../../home/common/Icons';

const Dates = ({ onSelectDateTime, currentLocation = '' }) => {
  const getTodayString = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const minDateStr = getTodayString();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [rawTime, setRawTime] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleConfirm = async () => {
    const targetCity = currentLocation || 'Chennai';
    const dateValue = selectedDate;
    const timeValue = selectedTime;

    if (!dateValue) {
      setErrorMsg('Please choose a date');
      return;
    }
    if (!timeValue) {
      setErrorMsg('Please select a time slot');
      return;
    }

    try {
      setIsVerifying(true);
      setErrorMsg('');
      setVerificationResult(null);

      const response = await fetch('http://localhost:5001/api/verify-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: targetCity,
          date: dateValue,
          time: timeValue,
        }),
      });

      const data = await response.json();

      if (data.success && data.isAvailable) {
        setVerificationResult(data.data);
        // Show details above button for 1.8 seconds, then trigger onSelectDateTime & clear
        setTimeout(() => {
          if (onSelectDateTime) {
            onSelectDateTime({
              ...data.data,
              formatted: data.data.bookingSummary,
            });
          }
          setVerificationResult(null);
        }, 1800);
      } else {
        setErrorMsg(data.message || 'Selected slot is unavailable. Please choose another date or time.');
      }
    } catch (err) {
      console.error('Error verifying slot:', err);
      // Fallback after 1.8 seconds
      setTimeout(() => {
        if (onSelectDateTime) {
          onSelectDateTime({
            city: targetCity,
            date: dateValue,
            time: timeValue,
            formatted: `${targetCity} on ${dateValue} at ${timeValue}`,
          });
        }
        setVerificationResult(null);
      }, 1800);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
          Choose Date
        </label>
        <div className="pt-0.5">
          <input
            type="date"
            min={minDateStr}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setVerificationResult(null);
              setErrorMsg('');
            }}
            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-50/80 border border-slate-200 hover:border-slate-800 text-[#2563EB] outline-none transition-colors focus:border-slate-900 focus:bg-white focus:outline-none cursor-pointer shadow-xs"
          />
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
            Choose Time Slot
          </label>
          <span className="text-[11px] text-[#1D4ED8] font-bold flex items-center space-x-1.5 bg-[#EFF6FF] border border-blue-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span>07:00 AM - 09:00 PM</span>
          </span>
        </div>

        <div className="pt-0.5 relative flex items-center">
          <input
            type="time"
            value={rawTime}
            onChange={(e) => {
              const val = e.target.value;
              setRawTime(val);
              if (!val) {
                setSelectedTime('');
                return;
              }
              const [hStr, mStr] = val.split(':');
              let h = parseInt(hStr, 10);
              const period = h >= 12 ? 'PM' : 'AM';
              h = h % 12 || 12;
              const formattedH = h < 10 ? `0${h}` : `${h}`;
              const formattedTime = `${formattedH}:${mStr} ${period}`;
              setSelectedTime(formattedTime);
              setVerificationResult(null);
              setErrorMsg('');
            }}
            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-50/80 border border-slate-200 hover:border-slate-800 text-[#2563EB] outline-none transition-colors focus:border-slate-900 focus:bg-white focus:outline-none cursor-pointer shadow-xs"
          />
          {selectedTime && (
            <span className="absolute right-3 px-2.5 py-1 rounded-xl bg-[#2563EB] text-white font-extrabold text-xs shadow-sm pointer-events-none">
              {selectedTime}
            </span>
          )}
        </div>
      </div>

      {/* Verification Feedback Banner */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {verificationResult && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 animate-fadeIn">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Slot Verified & Available!</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium">
            {verificationResult.bookingSummary}
          </p>
        </div>
      )}

      {/* Confirm Date & Time Schedule Button — Hides once verified */}
      {!verificationResult && (
        <button
          type="button"
          disabled={isVerifying}
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition-all duration-300 transform active:scale-98 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 text-blue-100" />
          <span>
            {isVerifying ? 'Verifying Slot...' : 'Confirm Schedule'}
          </span>
        </button>
      )}
    </div>
  );
};

export default Dates;
