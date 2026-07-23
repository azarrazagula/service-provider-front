import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import HeroSection from './components/hero/HeroSection';
import TrustBadge from './components/hero/TrustBadge';
import SelectServiceSection from './components/services/SelectServiceSection';
import TopRatedServicesSection from './components/services/TopRatedServicesSection';
import PoeticBanner from './components/trust/PoeticBanner';
import LocationMapContactSection from './components/common/LocationMapContactSection';
import LoginModal from './components/common/LoginModal';
import Footer from './components/common/Footer';
import { CheckCircle2, X } from './components/common/Icons';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleBookProvider = (provider) => {
    showNotification(`Appointment request initiated with ${provider.name} (${provider.specialty}). Please login to confirm slot.`);
    setIsLoginModalOpen(true);
  };

  const handleSelectCategory = (cat) => {
    // Select service action - does NOT open login modal as per user instruction
    showNotification(`You selected: ${cat.title}. Next, pick a provider below or choose your slot.`);
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
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <HeroSection
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onExploreServices={(e) => {
            if (e && e.preventDefault) e.preventDefault();
            const el = document.getElementById('select-service');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <TrustBadge />

        {/* Section 2: Which service do you want? (Doctor, Electrician, Plumber) */}
        <SelectServiceSection onSelectCategory={handleSelectCategory} />

        {/* Section 3: Top Rated Services Provider (4 cards per category line-by-line) */}
        <TopRatedServicesSection onBookProvider={handleBookProvider} />

        {/* Section 4: Poetic Trust Banner */}
        <PoeticBanner />

        {/* Section 5: Clean Light Location Map & Large Contact Section (Placed RIGHT BEFORE Footer!) */}
        <LocationMapContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Popup Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

    </div>
  );
}

export default App;
