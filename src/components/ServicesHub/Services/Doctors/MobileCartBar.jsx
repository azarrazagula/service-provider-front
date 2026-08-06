import React from 'react';
import { ChevronRight } from '../../../home/UI/Icons';

const MobileCartBar = ({ cartData, fetchCart, setIsCartOpen }) => {
  if (!cartData || cartData.count === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-16 sm:bottom-4 left-4 right-4 max-w-xl mx-auto z-50 animate-bounceIn">
      <div className="bg-[#FAF7F2] text-slate-900 rounded-3xl p-3 px-5 sm:px-6 flex items-center justify-between shadow-lg backdrop-blur-md border border-slate-200/80">
        {/* LEFT SIDE: ONLY AMOUNT */}
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-medium text-slate-950">₹{cartData.grandTotal}</span>
        </div>

        {/* RIGHT SIDE: VIEW CART BUTTON */}
        <button
          type="button"
          onClick={() => {
            fetchCart();
            setIsCartOpen(true);
          }}
          className="py-2 px-4 sm:py-2.5 sm:px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-all cursor-pointer shadow-sm hover:scale-102 shrink-0 flex items-center space-x-1.5"
        >
          <span>View Cart</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MobileCartBar;
