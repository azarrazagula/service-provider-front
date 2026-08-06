import React from 'react';
import { ShoppingCart, Trash2, X } from '../../../home/UI/Icons';

const MobileCartDrawer = ({
  isCartOpen,
  onClose,
  cartData,
  cartLoading,
  handleRemoveCartItem,
  handleClearCart,
  showNotification,
  navigate,
}) => {
  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/50 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-5 space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">Your Cart</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {cartLoading ? (
            <div className="p-8 text-center space-y-2">
              <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Loading Cart...</p>
            </div>
          ) : cartData.items.length === 0 ? (
            <div className="p-12 text-center space-y-2 text-slate-400">
              <ShoppingCart className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm font-medium text-slate-700">Your cart is empty</p>
              <p className="text-xs">Book a doctor consultation to see it here.</p>
            </div>
          ) : (
            cartData.items.map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 space-y-1"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {item.doctorId?.name || 'Doctor Consultation'}
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] font-medium text-emerald-700">
                    <span className="capitalize">{item.consultationType || 'Consultation'}</span>
                    <span>•</span>
                    <span>₹{item.totalFee}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {item.consultationDate && <span>📅 {item.consultationDate} • </span>}⏰ {item.timeSlot}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveCartItem(item._id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer shrink-0"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Total & Clear */}
        {cartData.items.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">Grand Total</span>
              <span className="text-lg font-semibold text-slate-900">₹{cartData.grandTotal}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleClearCart}
                className="py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-medium text-xs transition-colors cursor-pointer text-center"
              >
                Clear Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  if (showNotification) showNotification('Proceeding to Checkout!');
                  onClose();
                  navigate('/services/cart');
                }}
                className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-all cursor-pointer text-center shadow-xs"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileCartDrawer;
