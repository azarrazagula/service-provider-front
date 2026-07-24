import React, { useEffect, useRef, useState } from 'react';
import { GoogleIcon, Loader2 } from '../common/Icons';
import { googleLoginUser, saveAuthData } from './authService';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const hiddenGoogleBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const processGoogleToken = async (idToken) => {
    if (!idToken) return;
    setLoading(true);
    try {
      const response = await googleLoginUser(idToken);
      if (response && response.data) {
        saveAuthData({
          token: response.data.token,
          user: response.data.user,
        });

        if (onSuccess) {
          onSuccess({
            user: response.data.user,
            message: response.message || 'Google Sign-In successful!',
          });
        }
      }
    } catch (err) {
      console.error('Google Auth error:', err);
      const errMsg = err.message || 'Google authentication failed';
      if (onError) onError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      if (response.credential) {
        processGoogleToken(response.credential);
      }
    };

    const renderHiddenGoogleButton = () => {
      if (window.google?.accounts?.id && hiddenGoogleBtnRef.current) {
        try {
          hiddenGoogleBtnRef.current.innerHTML = '';
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
          });

          window.google.accounts.id.renderButton(hiddenGoogleBtnRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            width: 350,
          });
        } catch (e) {
          console.warn('Failed to initialize Google GSI:', e);
        }
      }
    };

    if (window.google?.accounts?.id) {
      renderHiddenGoogleButton();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          renderHiddenGoogleButton();
        }
      }, 100);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const handleButtonClick = () => {
    // 1. Try triggering Google prompt
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }

    // 2. Trigger programmatic click on native GSI button inside hidden container
    if (hiddenGoogleBtnRef.current) {
      const targetElement = hiddenGoogleBtnRef.current.querySelector('iframe, div[role="button"], div[tabindex]');
      if (targetElement) {
        targetElement.click();
      }
    }
  };

  return (
    <div className="w-full relative">
      {/* Off-screen hidden native Google iframe for GSI credentials */}
      <div ref={hiddenGoogleBtnRef} className="absolute -top-[9999px] -left-[9999px] opacity-0 pointer-events-none" />

      {loading ? (
        <div className="w-full py-3.5 px-4 rounded-2xl border border-slate-200 bg-slate-50/80 flex items-center justify-center space-x-2 text-slate-700 text-sm font-semibold shadow-sm animate-pulse">
          <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
          <span>Authenticating with Google...</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full py-3.5 px-4 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50/90 active:scale-[0.98] text-slate-700 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-3 group cursor-pointer hover:border-slate-300"
        >
          <GoogleIcon className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" />
          <span>Continue with Google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
