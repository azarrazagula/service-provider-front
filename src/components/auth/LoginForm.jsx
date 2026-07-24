import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from '../common/Icons';
import { loginUser, saveAuthData } from './authService';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'email') {
      if (!value || !value.trim()) {
        errorMsg = 'Please enter your email address.';
      } else if (!/\S+@\S+\.\S+/.test(value.trim())) {
        errorMsg = 'Please enter a valid email address (e.g. user@example.com).';
      }
    } else if (name === 'password') {
      if (!value) {
        errorMsg = 'Please enter your password.';
      }
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (fieldName) => {
    setFocusedInput(null);
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const fieldError = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailErr = validateField('email', formData.email);
    const passwordErr = validateField('password', formData.password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response && response.data) {
        saveAuthData({
          token: response.data.token,
          user: response.data.user,
        });

        if (onSuccess) {
          onSuccess({
            user: response.data.user,
            message: response.message || 'Login successful!',
          });
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5" noValidate>
      {/* Animated Server Error Alert */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500 animate-bounce" />
          <span className="font-semibold leading-snug">{error}</span>
        </div>
      )}

      {/* EMAIL FIELD */}
      <div>
        <div className="relative group">
          <label
            htmlFor="login-email"
            className={`absolute left-10 pointer-events-none transition-all duration-200 ease-out ${focusedInput === 'email' || formData.email
              ? `-top-2.5 left-7 z-10 px-1 bg-white text-xs font-bold ${touched.email && errors.email ? 'text-rose-600' : 'text-teal-600'
              }`
              : 'top-3.5 text-slate-400 font-medium text-sm'
              }`}
          >
            Email Address
          </label>

          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-all duration-300 ${touched.email && errors.email
            ? 'text-rose-500'
            : focusedInput === 'email' || formData.email
              ? 'text-teal-600 scale-110'
              : 'text-slate-400'
            }`}>
            <Mail className="w-5 h-5" />
          </div>

          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => handleBlur('email')}
            className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border bg-slate-50/50 focus:bg-white text-slate-900 font-semibold text-sm focus:outline-none focus:scale-[1.01] transition-all duration-200 shadow-sm ${touched.email && errors.email
              ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 hover:border-slate-300'
              }`}
          />
        </div>

        {/* Inline Helper Text Error */}
        {touched.email && errors.email && (
          <p className="text-xs font-semibold text-rose-600 mt-1.5 pl-2 flex items-center space-x-1.5 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* PASSWORD FIELD */}
      <div>
        <div className="relative group">
          <label
            htmlFor="login-password"
            className={`absolute left-10 pointer-events-none transition-all duration-200 ease-out ${focusedInput === 'password' || formData.password
              ? `-top-2.5 left-7 z-10 px-1 bg-white text-xs font-bold ${touched.password && errors.password ? 'text-rose-600' : 'text-teal-600'
              }`
              : 'top-3.5 text-slate-400 font-medium text-sm'
              }`}
          >
            Password
          </label>

          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-all duration-300 ${touched.password && errors.password
            ? 'text-rose-500'
            : focusedInput === 'password' || formData.password
              ? 'text-teal-600 scale-110'
              : 'text-slate-400'
            }`}>
            <Lock className="w-5 h-5" />
          </div>

          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => handleBlur('password')}
            className={`w-full pl-11 pr-11 py-3.5 rounded-2xl border bg-slate-50/50 focus:bg-white text-slate-900 font-semibold text-sm focus:outline-none focus:scale-[1.01] transition-all duration-200 shadow-sm ${touched.password && errors.password
              ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 hover:border-slate-300'
              }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-teal-600 active:scale-90 transition-all duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Inline Helper Text Error */}
        {touched.password && errors.password && (
          <p className="text-xs font-semibold text-rose-600 mt-1.5 pl-2 flex items-center space-x-1.5 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="relative w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 hover:from-teal-500 hover:via-teal-600 hover:to-emerald-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>

      {/* OR DIVIDER */}
      <div className="relative flex items-center justify-center my-3">
        <div className="border-t border-slate-200/80 w-full" />
        <span className="bg-white px-3 py-0.5 rounded-full border border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute shadow-xs">
          Or continue with
        </span>
      </div>

      {/* GOOGLE OAUTH LOGIN BUTTON */}
      <div className="pt-0.5">
        <GoogleLoginButton
          onSuccess={onSuccess}
          onError={(msg) => setError(msg)}
        />
      </div>



      {/* Footer Switch Link */}
      <div className="text-center text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
        Don't have an account yet?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-teal-700 font-extrabold hover:text-teal-900 hover:underline transition-colors ml-1"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
