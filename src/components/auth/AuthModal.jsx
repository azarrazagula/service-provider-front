import React, { useState, useEffect } from 'react';
import { X, User, Sparkles, ShieldCheck } from '../common/Icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OtpVerificationForm from './OtpVerificationForm';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'verify-otp'
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setPendingEmail('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSuccess = (data) => {
    if (onSuccess) {
      onSuccess(data);
    }
    onClose();
  };

  const handleRequireOtp = ({ email }) => {
    if (email) {
      setPendingEmail(email);
    }
    setMode('verify-otp');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dynamic Backdrop Overlay with Gaussian Blur & Fade */}
      <div 
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-md transition-all duration-500 animate-fadeIn"
        onClick={onClose}
      />

      {/* Animated Modal Dialog Container */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden z-10 animate-scaleUp transition-all duration-300">
        
        {/* Animated Gradient Decorative Header */}
        <div className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 p-6 sm:p-7 text-white overflow-hidden">
          {/* Animated Background Glowing Orbs */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-teal-400/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-12 -left-8 w-32 h-32 bg-emerald-400/25 rounded-full blur-2xl animate-pulse delay-750" />

          {/* Close Modal Button with Hover & Active Animation */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 flex items-center justify-center text-white transition-all duration-200 border border-white/20 shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon with Floating Bounce Effect */}
          <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl shadow-inner border border-white/30 mb-3 group hover:scale-105 transition-transform">
            {mode === 'verify-otp' ? (
              <ShieldCheck className="w-7 h-7 text-white drop-shadow-sm" />
            ) : (
              <User className="w-7 h-7 text-white drop-shadow-sm" />
            )}
            <Sparkles className="w-4 h-4 text-teal-200 absolute -top-1 -right-1 animate-spin duration-10000" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
            {mode === 'login'
              ? 'Welcome Back!'
              : mode === 'register'
              ? 'Create Account'
              : 'Verify Your Email'}
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
            {mode === 'login' 
              ? 'Sign in to access your bookings & top providers' 
              : mode === 'register'
              ? 'Join Service Provider to book verified experts instantly'
              : 'Enter 6-digit OTP code to complete registration'}
          </p>
        </div>

        {/* Animated Sliding Pill Tab Switcher (Shown only for Login / Register modes) */}
        {mode !== 'verify-otp' && (
          <div className="p-2 bg-slate-100/80 border-b border-slate-200/60">
            <div className="relative flex bg-slate-200/60 p-1 rounded-2xl">
              {/* Sliding Pill Indicator */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-md border border-slate-200/80 transition-all duration-300 ease-out ${
                  mode === 'register' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
                }`}
              />
              
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`relative z-10 flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 ${
                  mode === 'login' ? 'text-teal-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('register')}
                className={`relative z-10 flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 ${
                  mode === 'register' ? 'text-teal-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Register</span>
              </button>
            </div>
          </div>
        )}

        {/* Conditionally Render Separate Form Components */}
        {mode === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onSwitchToRegister={() => setMode('register')} 
          />
        ) : mode === 'register' ? (
          <RegisterForm 
            onSuccess={handleSuccess} 
            onSwitchToLogin={() => setMode('login')} 
            onRequireOtp={handleRequireOtp}
          />
        ) : (
          <OtpVerificationForm
            email={pendingEmail}
            onSuccess={handleSuccess}
            onBackToLogin={() => setMode('login')}
          />
        )}

      </div>
    </div>
  );
};

export default AuthModal;
