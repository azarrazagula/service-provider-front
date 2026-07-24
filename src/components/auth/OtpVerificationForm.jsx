import React, { useState, useEffect, useRef } from 'react';
import { Mail, AlertCircle, Loader2, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Key } from '../common/Icons';
import { verifyOtpUser, resendOtpUser, saveAuthData } from './authService';

const OtpVerificationForm = ({ email: initialEmail, onSuccess, onBackToLogin }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);


  // Focus first OTP box on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Resend Countdown Timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newDigits = [...otpDigits];

    // Handle multi-character paste (e.g. user pastes "595756")
    if (value.length > 1) {
      const pastedDigits = value.slice(0, 6).split('');
      pastedDigits.forEach((digit, i) => {
        newDigits[i] = digit;
      });
      setOtpDigits(newDigits);
      if (inputRefs.current[Math.min(pastedDigits.length, 5)]) {
        inputRefs.current[Math.min(pastedDigits.length, 5)].focus();
      }
      return;
    }

    newDigits[index] = value;
    setOtpDigits(newDigits);
    if (error) setError('');

    // Auto-advance focus to next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: move focus to previous input if empty
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtpDigits(digits);
      if (inputRefs.current[5]) inputRefs.current[5].focus();
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    if (!email) {
      setError('Email address is missing. Please restart verification.');
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOtpUser({
        email: email.trim(),
        otp: fullOtp,
      });

      if (response && response.data) {
        saveAuthData({
          token: response.data.token,
          user: response.data.user,
        });

        if (onSuccess) {
          onSuccess({
            user: response.data.user,
            message: response.message || 'Email verified successfully!',
          });
        }
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resending) return;
    setError('');
    setSuccessMessage('');
    setResending(true);

    try {
      const response = await resendOtpUser({ email: email.trim() });
      setSuccessMessage(response.message || 'A new OTP code has been sent to your email.');
      setResendTimer(30); // reset 30s timer
      setOtpDigits(['', '', '', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      setError(err.message || 'Failed to resend OTP code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 animate-fadeIn" noValidate>
      {/* Animated Server Error Alert */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500 animate-bounce" />
          <span className="font-semibold leading-snug">{error}</span>
        </div>
      )}

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
          <span className="font-semibold leading-snug">{successMessage}</span>
        </div>
      )}

      {/* Target Email Info Badge */}
      <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center shrink-0 font-bold">
          <Mail className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Verification sent to</p>
          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{email}</p>
        </div>
      </div>

      {/* 6-DIGIT OTP INPUTS */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2.5 text-center flex items-center justify-center space-x-1.5">
          <Key className="w-4 h-4 text-teal-600" />
          <span>Enter 6-Digit OTP Code</span>
        </label>

        <div className="flex justify-between items-center space-x-1.5 sm:space-x-2" onPaste={handlePaste}>
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-extrabold rounded-2xl border bg-slate-50/50 focus:bg-white text-slate-900 focus:outline-none transition-all duration-200 shadow-sm ${
                digit
                  ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/30'
                  : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 hover:border-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* RESEND OTP SECTION */}
      <div className="text-center pt-1">
        <button
          type="button"
          disabled={resendTimer > 0 || resending}
          onClick={handleResend}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 disabled:text-slate-400 transition-colors disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
          <span>
            {resending
              ? 'Sending new OTP...'
              : resendTimer > 0
              ? `Resend OTP in ${resendTimer}s`
              : 'Resend OTP Code'}
          </span>
        </button>
      </div>

      {/* SUBMIT VERIFY BUTTON */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading || otpDigits.join('').length < 6}
          className="relative w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-500 hover:via-teal-600 hover:to-emerald-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 group overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying OTP...</span>
            </>
          ) : (
            <>
              <span>Verify & Complete</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>

      {/* Back to Login Link */}
      <div className="text-center text-xs font-medium text-slate-600 pt-2 border-t border-slate-100 flex items-center justify-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-slate-500 font-bold hover:text-teal-700 transition-colors flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
