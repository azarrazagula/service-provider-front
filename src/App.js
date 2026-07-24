import React, { useState } from "react";
import Navbar from "./components/common/Navbar";
import HeroSection from "./components/home/HeroSection";
import TrustBadge from "./components/home/TrustBadge";
import SelectServiceSection from "./components/home/SelectServiceSection";
import LocationMapContactSection from "./components/home/LocationMapContactSection";
import Footer from "./components/common/Footer";
import AuthModal from "./components/auth/AuthModal";
import { CheckCircle2, X } from "./components/common/Icons";
import { getStoredUser, clearAuthData } from "./components/auth/authService";

function App() {
  const [notification, setNotification] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSelectCategory = (cat) => {
    // Select service action - does NOT open login modal as per user instruction
    showNotification(
      `You selected: ${cat.title}. Next, pick a provider below or choose your slot.`,
    );
  };

  const handleAuthSuccess = ({ user, message }) => {
    setCurrentUser(user);
    showNotification(message || `Welcome, ${user.name}!`);
  };

  const handleLogout = () => {
    clearAuthData();
    setCurrentUser(null);
    showNotification("Logged out successfully.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-teal-500/30 flex items-start space-x-3 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm font-medium">
            {notification}
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenLogin={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <HeroSection
          onExploreServices={(e) => {
            if (e && e.preventDefault) e.preventDefault();
            const el = document.getElementById("select-service");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <TrustBadge />

        {/* Section 2: Which service do you want? (Doctor, Electrician, Plumber) */}
        <SelectServiceSection onSelectCategory={handleSelectCategory} />

        {/* Section 4: Location Map & Large Contact Section */}
        <LocationMapContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Popup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
