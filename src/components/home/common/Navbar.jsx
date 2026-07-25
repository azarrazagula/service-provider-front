import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut } from './Icons';
import { gsap } from 'gsap';

// Style constants (defined outside component — no re-creation on render)
const FLIP_INNER_STYLE = { transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' };
const FRONT_FACE_STYLE = { backfaceVisibility: 'hidden' };
const BACK_FACE_STYLE  = { backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' };
const FILL_STYLE = { position: 'absolute', inset: 0, backgroundColor: '#4f46e5', transformOrigin: 'top', transform: 'scaleY(0)', zIndex: 0 };

const Navbar = ({ onOpenLogin, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const flipWrapRef  = useRef(null);
  const flipInnerRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const mobileFillRef = useRef(null);
  const isTouching = useRef(false);

  const logoRef = useRef(null);
  const navLinksRef = useRef(null);

  // Navbar mount GSAP Timeline Entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
    }

    if (navLinksRef.current && navLinksRef.current.children) {
      tl.fromTo(
        navLinksRef.current.children,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        '-=0.3'
      );
    }

    if (flipWrapRef.current) {
      tl.fromTo(
        flipWrapRef.current,
        { opacity: 0, x: 30, scale: 0.88 },
        { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)' },
        '-=0.25'
      );
    }
  }, []);

  // Desktop flip handlers
  const handleFlipEnter = () => gsap.to(flipInnerRef.current, { rotateY: 180, duration: 0.45, ease: 'power2.inOut' });
  const handleFlipLeave = () => gsap.to(flipInnerRef.current, { rotateY: 0,   duration: 0.45, ease: 'power2.inOut' });
  const handleLoginClick = () => {
    gsap.timeline()
      .to(flipWrapRef.current, { scale: 0.9, duration: 0.1, ease: 'power2.in' })
      .to(flipWrapRef.current, { scale: 1,   duration: 0.25, ease: 'back.out(2)' });
    onOpenLogin();
  };

  // Mobile fill-sweep handlers
  const handleMobileHoverEnter = () => {
    if (isTouching.current) return;
    gsap.to(mobileFillRef.current, { scaleY: 1, duration: 0.38, ease: 'power2.inOut' });
  };
  const handleMobileHoverLeave = () =>
    gsap.to(mobileFillRef.current, { scaleY: 0, duration: 0.3, ease: 'power2.inOut' });

  // Mobile touch feedback
  const handleMobileTouchStart = () => {
    isTouching.current = true;
    gsap.to(mobileBtnRef.current, { scale: 0.96, duration: 0.1, ease: 'power2.in' });
  };
  const handleMobileTouchEnd = () => {
    gsap.to(mobileBtnRef.current, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    gsap.to(mobileFillRef.current, { scaleY: 0, duration: 0.2, ease: 'power2.out' });
    setTimeout(() => { isTouching.current = false; }, 500);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Brand */}
          <div ref={logoRef} className="flex items-center space-x-3 cursor-pointer group">
            <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
              Service Provider
            </span>
          </div>

          {/* Desktop Nav */}
          <nav ref={navLinksRef} className="hidden lg:flex items-center space-x-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
            <a href="#home" className="px-6 py-2 rounded-full text-sm font-semibold text-teal-900 bg-white shadow-sm border border-teal-100 transition-all hover:shadow">
              Home
            </a>
          </nav>

          {/* Desktop Right: User or Flip Login */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-teal-50/80 border border-teal-200/80 pl-2 pr-3 py-1.5 rounded-full shadow-sm">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs uppercase shadow-sm">
                  {currentUser.name?.charAt(0) ?? 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name || 'User'}</span>
                  <span className="text-[10px] text-teal-700 font-medium">{currentUser.email}</span>
                </div>
                <button type="button" onClick={onLogout} className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1" title="Logout" aria-label="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div ref={flipWrapRef} onMouseEnter={handleFlipEnter} onMouseLeave={handleFlipLeave} onClick={handleLoginClick} style={{ perspective: '600px', cursor: 'pointer' }} className="relative w-36 h-11">
                <div ref={flipInnerRef} style={FLIP_INNER_STYLE}>
                  {/* Front */}
                  <div style={FRONT_FACE_STYLE} className="absolute inset-0 flex items-center justify-center px-4 rounded-full bg-teal-50 border border-teal-200 shadow-sm">
                    <span className="text-sm font-semibold text-slate-800">Login</span>
                  </div>
                  {/* Back */}
                  <div style={BACK_FACE_STYLE} className="absolute inset-0 flex items-center justify-center space-x-2 px-4 rounded-full bg-teal-600 border border-teal-700 shadow-md">
                    <span className="text-sm font-bold text-white">Sign In</span>
                    <span className="text-white text-base font-bold">→</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <div className="flex lg:hidden items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2.5 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-teal-50 border border-slate-200 transition-all" aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl font-semibold text-teal-800 bg-teal-50 text-center">
            Home
          </a>
          <div className="pt-2">
            {currentUser ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm uppercase">
                    {currentUser.name?.charAt(0) ?? 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition-all text-sm">
                  <LogOut className="w-4 h-4" /><span>Logout</span>
                </button>
              </div>
            ) : (
              <button ref={mobileBtnRef} onMouseEnter={handleMobileHoverEnter} onMouseLeave={handleMobileHoverLeave} onTouchStart={handleMobileTouchStart} onTouchEnd={handleMobileTouchEnd}
                onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                className="relative w-full overflow-hidden flex items-center justify-center py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-md"
              >
                <div ref={mobileFillRef} style={FILL_STYLE} />
                <span style={{ position: 'relative', zIndex: 1 }}>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
