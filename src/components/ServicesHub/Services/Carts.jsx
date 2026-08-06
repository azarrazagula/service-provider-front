import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Trash2,
  PhoneCall,
  Video,
  ArrowRight
} from '../../home/UI/Icons';

const API_BASE_URL = 'http://localhost:5001/api';

const Carts = ({ showNotification, onProceedToCheckout }) => {
  const [cartData, setCartData] = useState({ count: 0, grandTotal: 0, items: [] });
  const [loading, setLoading] = useState(true);

  // ── Fetch Cart Items (GET /api/cart) ──────────────────────────────────────
  const fetchCart = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${API_BASE_URL}/cart`);
      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/cart/get`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setCartData({
          count: data.count || data.data.length,
          grandTotal: data.grandTotal || 0,
          items: data.data
        });
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ── Remove Single Item (DELETE /api/cart/:id) ────────────────────────────
  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        if (showNotification) showNotification('Item removed from cart');
        fetchCart();
      }
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  // ── Clear All Cart Items (DELETE /api/cart/clear) ─────────────────────────
  const handleClearCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        if (showNotification) showNotification('Cart cleared successfully');
        fetchCart();
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 font-sans space-y-6">

      {/* Cart Page Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Your Medical Cart</h1>
            <p className="text-xs text-slate-500 font-medium">Review your doctor consultations before payment</p>
          </div>
        </div>

        {cartData.items.length > 0 && (
          <button
            type="button"
            onClick={handleClearCart}
            className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Cart Content */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
          <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading your cart items...</p>
        </div>
      ) : cartData.items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4">
          <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Cart is Currently Empty</h3>
            <p className="text-xs text-slate-400 mt-1">Explore our verified specialists and book a consultation.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items List */}
          <div className="space-y-3">
            {cartData.items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Doctor Info */}
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src={item.doctorId?.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600'}
                      alt={item.doctorId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h4 className="text-base font-black text-slate-900 truncate">
                      {item.doctorId?.name || 'Doctor Specialist'}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold">{item.doctorId?.degree}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-lg capitalize">
                        {item.consultationType === 'videoCall' ? (
                          <Video className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span>{item.consultationType || 'Consultation'}</span>
                      </span>

                      {item.consultationDate && (
                        <span className="text-[11px] font-semibold text-slate-600">
                          📅 {item.consultationDate}
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-slate-600">
                        ⏰ {item.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Delete */}
                <div className="flex items-center justify-between sm:justify-end space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fee</div>
                    <div className="text-lg font-black text-slate-900">₹{item.totalFee}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item._id)}
                    className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total Summary & Checkout */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Grand Total</span>
              <span className="text-2xl font-black text-slate-900">₹{cartData.grandTotal}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (showNotification) showNotification('Proceeding to Checkout!');
                if (onProceedToCheckout) onProceedToCheckout();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Carts;
