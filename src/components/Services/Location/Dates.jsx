import React, { useState } from 'react';
import { Clock, CheckCircle2 } from '../../home/common/Icons';

const Dates = ({ onSelectDateTime, currentLocation = '' }) => {
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
        if (onSelectDateTime) {
          onSelectDateTime({
            ...data.data,
            formatted: data.data.bookingSummary,
          });
        }
      } else {
        setErrorMsg(data.message || 'Selected slot is unavailable. Please choose another date or time.');
      }
    } catch (err) {
      console.error('Error verifying slot:', err);
      // Fallback
      if (onSelectDateTime) {
        onSelectDateTime({
          city: targetCity,
          date: dateValue,
          time: timeValue,
          formatted: `${targetCity} on ${dateValue} at ${timeValue}`,
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Choose Date
        </label>
        <div className="pt-1">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setVerificationResult(null);
              setErrorMsg('');
            }}
            className="w-full px-3.5 py-3 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-teal-600 focus:bg-white shadow-inner"
          />
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Choose Time Slot
          </label>
          <span className="text-[10px] text-teal-700 font-semibold flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>07:00 AM - 09:00 PM</span>
          </span>
        </div>

        <div className="pt-1">
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
            className="w-full px-3.5 py-3 rounded-2xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-teal-600 focus:bg-white shadow-inner"
          />
        </div>
      </div>

      {/* Verification Feedback Banner */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {verificationResult && (
        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-800">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Slot Verified & Available!</span>
          </div>
          <p className="text-xs text-teal-950 font-medium">
            {verificationResult.bookingSummary}
          </p>
        </div>
      )}

      {/* Confirm Date & Time Schedule Button */}
      <button
        type="button"
        disabled={isVerifying}
        onClick={handleConfirm}
        className="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-teal-700/20 transition-all duration-300 transform active:scale-98"
      >
        <CheckCircle2 className="w-5 h-5 text-teal-300" />
        <span>
          {isVerifying ? 'Verifying Slot...' : 'Confirm Schedule'}
        </span>
      </button>
    </div>
  );
};

export default Dates;
