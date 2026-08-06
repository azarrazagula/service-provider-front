import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle2 } from '../../home/UI/Icons';

// Import Modular Sub-Components from Doctors folder
import DoctorListHeader from './Doctors/DoctorListHeader';
import DoctorCard from './Doctors/DoctorCard';
import DoctorBookingModal from './Doctors/DoctorBookingModal';
import DesktopCartSidebar from './Doctors/DesktopCartSidebar';
import MobileCartDrawer from './Doctors/MobileCartDrawer';
import MobileCartBar from './Doctors/MobileCartBar';

const API_BASE_URL = 'http://localhost:5001/api';

const DoctorList = ({ showNotification, currentUser, onLogout }) => {
  const navigate = useNavigate();

  // ── States ────────────────────────────────────────────────────────────────
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky header title reveal
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal / Booking State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState('audioCall');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
  const [bookingLoading, setBookingLoading] = useState(false);

  // Cart State
  const [cartData, setCartData] = useState({ count: 0, grandTotal: 0, items: [] });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  // Helper to check if a doctor is in cart
  const isDoctorInCart = (docId) => {
    if (!cartData || !Array.isArray(cartData.items)) return false;
    return cartData.items.some((item) => {
      const cartDocId = item.doctorId?._id || item.doctorId;
      return String(cartDocId) === String(docId);
    });
  };

  // ── 1. Fetch All Doctors List (GET /api/alldoctors) ──────────────────────
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/alldoctors`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setDoctors(data.data);
      } else {
        setError('Failed to load doctors list');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Server connection error. Please make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── 2. Fetch User Cart (GET /api/cart) ───────────────────────────────────
  const fetchCart = async () => {
    setCartLoading(true);
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
          items: data.data,
        });
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchCart();
  }, []);

  // ── 3. Add Doctor to Cart (POST /api/cart/add or POST /api/cart) ─────────
  const handleAddToCart = async () => {
    if (!selectedDoctor) return;
    setBookingLoading(true);
    try {
      const payload = {
        doctorId: selectedDoctor._id,
        consultationType: consultationType || 'audioCall',
        consultationDate: new Date().toISOString().split('T')[0],
        timeSlot: selectedTimeSlot || '10:00 AM',
      };

      let response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (data.success) {
        if (showNotification) {
          showNotification(`Dr. ${selectedDoctor.name} added to your cart!`);
        }
        await fetchCart();
        setSelectedDoctor(null);
      } else {
        alert(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to connect to backend server');
    } finally {
      setBookingLoading(false);
    }
  };

  // ── 4. Remove Item from Cart (DELETE /api/cart/remove/:id or DELETE /api/cart/:id) ──
  const handleRemoveCartItem = async (itemId) => {
    try {
      let response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
          method: 'DELETE',
        });
      }
      const data = await response.json();
      if (data.success) {
        if (showNotification) showNotification('Doctor consultation removed');
        await fetchCart();
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // ── 5. Clear Entire Cart (DELETE /api/cart/clear) ─────────────────────────
  const handleClearCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        if (showNotification) showNotification('Cart cleared');
        await fetchCart();
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  // ── 6. Open Modal ────────────────────────────────────────────────────────
  const openDoctorModal = (doc) => {
    setSelectedDoctor(doc);
    setConsultationType('audioCall');
    setSelectedTimeSlot('10:00 AM');
  };

  // Filter Doctors by Search Query and Selected Category
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.degree.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      doc.category === selectedCategory ||
      doc.specialty === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-white min-h-screen pb-28 font-sans animate-fadeIn">
      {/* 1. STICKY TOP HEADER NAVBAR */}
      <DoctorListHeader
        navigate={navigate}
        isScrolled={isScrolled}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowAccountModal={setShowAccountModal}
        showNotification={showNotification}
      />

      {/* 2. MAIN CONTAINER WITH URBANCOMPANY 3-COLUMN DESKTOP GRID */}
      <div className="max-w-7xl lg:mx-auto px-4 sm:px-12 lg:px-2 lg:gap-x-2 pt-10 pb-12">
        {/* TOP LEFT MAIN PAGE TITLE */}
        <div className="w-full md:w-full lg:w-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight pt-4 text-left">
            Pediatricians
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT INDENT COLUMN (3 COLUMNS ON DESKTOP - NO TOP BORDER) */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* RIGHT 9 COLUMNS (MIDDLE LIST + RIGHT SIDEBAR - CLEAN TOP PADDING ALIGNMENT) */}
          <div className="col-span-1 lg:col-span-9 grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-8 items-start lg:border-t border-slate-200/80">
            {/* CENTER COLUMN: DOCTOR LIST & CATEGORY HEADER (5 COLUMNS OF 9) */}
            <div className="col-span-1 lg:col-span-5 min-w-0 lg:border-l lg:border-r border-slate-200/80 px-4 sm:px-8 pt-8 pb-8 space-y-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-left tracking-tight">
                {selectedCategory === 'All' ? 'Pediatric Specialists' : selectedCategory}
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs animate-pulse flex justify-between">
                      <div className="space-y-3 flex-1 pr-4">
                        <div className="h-5 bg-slate-200 rounded-md w-2/3" />
                        <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                        <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                      </div>
                      <div className="w-36 h-36 bg-slate-200 rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-rose-50/80 rounded-3xl p-8 text-center border border-rose-100 space-y-3">
                  <p className="text-rose-700 font-semibold text-sm">{error}</p>
                  <button
                    type="button"
                    onClick={fetchDoctors}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 space-y-2">
                  <p className="text-slate-800 font-semibold text-sm">No doctors found in this category</p>
                  <p className="text-slate-400 text-xs font-medium">Try selecting another specialty.</p>
                </div>
              ) : (
                <div className="divide-y-4 divide-slate-200">
                  {filteredDoctors.slice(0, 4).map((doc) => {
                    const isInCart = isDoctorInCart(doc._id);
                    const cartItem = cartData.items.find((item) => {
                      const cartDocId = item.doctorId?._id || item.doctorId;
                      return String(cartDocId) === String(doc._id);
                    });

                    return (
                      <DoctorCard
                        key={doc._id}
                        doc={doc}
                        isInCart={isInCart}
                        cartItem={cartItem}
                        openDoctorModal={openDoctorModal}
                        handleRemoveCartItem={handleRemoveCartItem}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: DESKTOP CART SIDEBAR (4 COLUMNS OF 9) */}
            <div className="col-span-1 lg:col-span-4 sticky top-24 pt-6">
              <DesktopCartSidebar
                cartData={cartData}
                cartLoading={cartLoading}
                handleRemoveCartItem={handleRemoveCartItem}
                handleClearCart={handleClearCart}
                openDoctorModal={openDoctorModal}
                showNotification={showNotification}
                navigate={navigate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. MOBILE FLOATING VIEW CART BAR */}
      <MobileCartBar
        cartData={cartData}
        fetchCart={fetchCart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* 5. DOCTOR BOOKING MODAL */}
      <DoctorBookingModal
        selectedDoctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        consultationType={consultationType}
        setConsultationType={setConsultationType}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        timeSlots={timeSlots}
        bookingLoading={bookingLoading}
        handleAddToCart={handleAddToCart}
      />

      {/* 6. MOBILE CART DRAWER MODAL */}
      <MobileCartDrawer
        isCartOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartData={cartData}
        cartLoading={cartLoading}
        handleRemoveCartItem={handleRemoveCartItem}
        handleClearCart={handleClearCart}
        showNotification={showNotification}
        navigate={navigate}
      />

      {/* 7. ACCOUNT PROFILE MODAL */}
      {showAccountModal && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAccountModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full p-6 space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 truncate">{currentUser?.name || 'User Profile'}</h3>
                <p className="text-xs text-slate-500 truncate">{currentUser?.email || 'user@example.com'}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                <span>Account Status</span>
                <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowAccountModal(false);
                  if (onLogout) onLogout();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
