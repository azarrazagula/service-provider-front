import React from 'react';
import { ShoppingCart, Percent, ChevronRight } from '../../../home/UI/Icons';

const DesktopCartSidebar = ({
  cartData,
  cartLoading,
  handleRemoveCartItem,
  handleClearCart,
  openDoctorModal,
  showNotification,
  navigate,
}) => {
  return (
    <div className="hidden lg:block w-full space-y-4">
      {/* 1. PROMO OFFER BADGE CARD */}
      <div className="border border-slate-200/90 rounded-lg p-6 flex items-center space-x-3 bg-white shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Percent className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-900">Get visitation fee off</div>
          <div className="text-[11px] text-slate-500 font-medium">On orders above ₹500</div>
        </div>
      </div>

      {/* 2. OUR PROMISE CARD (URBANCOMPANY STYLE) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Our Promise</h3>
          {/* Circular Quality Assured Badge */}
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex flex-col items-center justify-center text-[8px] font-extrabold uppercase leading-none tracking-tighter text-center shadow-2xs">
            <span>Quality</span>
            <span className="text-[7px] text-emerald-600">Assured</span>
          </div>
        </div>

        <div className="space-y-2 text-xs font-medium text-slate-700 pt-1">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>Verified Specialists</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>Hassle Free Booking</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold text-sm">✓</span>
            <span>Transparent Pricing</span>
          </div>
        </div>
      </div>

      {/* 3. CART SIDEBAR CARD */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Cart</h3>
          {cartData.count > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              className="text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartLoading ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Updating Cart...</p>
          </div>
        ) : cartData.items.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300 border border-slate-100">
              <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">No items in your cart</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                Add a doctor consultation to see details and checkout.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* CLEAN ITEM ROW LIST */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 pr-1">
              {cartData.items.map((item) => (
                <div
                  key={item._id}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-2"
                >
                  {/* LEFT: DOCTOR NAME / SERVICE TITLE */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {item.doctorId?.name || 'Doctor Consultation'}
                    </div>
                  </div>

                  {/* CENTER: - 1 + QUANTITY PILL BUTTON */}
                  <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200/80 rounded-xl px-2.5 py-1 text-emerald-800 text-xs font-bold shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveCartItem(item._id)}
                      className="w-4 h-4 flex items-center justify-center hover:bg-emerald-200/80 rounded text-emerald-950 font-extrabold transition-colors cursor-pointer"
                      title="Remove from cart"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-0.5">1</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.doctorId && openDoctorModal) openDoctorModal(item.doctorId);
                      }}
                      className="w-4 h-4 flex items-center justify-center hover:bg-emerald-200/80 rounded text-emerald-950 font-extrabold transition-colors cursor-pointer"
                      title="Add / change options"
                    >
                      +
                    </button>
                  </div>

                  {/* RIGHT: FEE AMOUNT */}
                  <div className="text-xs font-bold text-slate-900 shrink-0 min-w-[45px] text-right">
                    ₹{item.totalFee}
                  </div>
                </div>
              ))}
            </div>

            {/* SOLID FULL-WIDTH BOTTOM BUTTON WITH PRICE & VIEW CART / CHECKOUT */}
            <button
              type="button"
              onClick={() => {
                if (showNotification) showNotification('Proceeding to Checkout!');
                navigate('/services/cart');
              }}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-between shadow-md transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>₹{cartData.grandTotal}</span>
              <div className="flex items-center space-x-1">
                <span>View Cart</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopCartSidebar;
