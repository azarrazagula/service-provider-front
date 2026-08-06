import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Minimalist GSAP Animated Add / Quantity Counter (- 1 +) Button Component
const BookButton = ({ isInCart, cartItem, onAdd, onRemove }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.92 },
        { scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isInCart]);

  if (isInCart) {
    return (
      <div
        ref={btnRef}
        className="bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 shadow-xs rounded-xl px-2 py-0.5 sm:px-2.5 sm:py-1 flex items-center space-x-1.5 sm:space-x-2.5 text-[10px] sm:text-xs font-medium shrink-0"
      >
        {/* MINUS BUTTON: REMOVES ITEM FROM CART */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (cartItem && onRemove) onRemove(cartItem._id);
          }}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-emerald-100/70 hover:bg-rose-500 hover:text-white text-emerald-900 flex items-center justify-center cursor-pointer transition-colors text-xs sm:text-sm font-medium"
          title="Remove from cart"
        >
          -
        </button>

        <span className="font-bold text-emerald-950 px-0.5">1</span>

        {/* PLUS BUTTON: OPENS MODAL / ADDS AGAIN */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onAdd) onAdd();
          }}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-emerald-100/70 hover:bg-emerald-600 hover:text-white text-emerald-900 flex items-center justify-center cursor-pointer transition-colors text-xs sm:text-sm font-medium"
          title="Change consultation method"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onAdd}
      className="px-3.5 py-1 sm:px-5 sm:py-1.5 rounded-xl text-[10px] sm:text-base font-medium bg-white text-emerald-700 border border-emerald-200/80 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all duration-200 shadow-xs cursor-pointer hover:scale-102 active:scale-98 flex items-center justify-center space-x-1"
    >
      <span>Add</span>
      <span>+</span>
    </button>
  );
};

export default BookButton;
