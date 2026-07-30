import React from "react";
import Navbar from "./common/Navbar";
import HeroSection from "./HeroSection";
import TrustBadge from "./TrustBadge";
import SelectServiceSection from "./SelectServiceSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./common/Footer";

const HomePage = ({ currentUser, onOpenLogin, onLogout, onSelectCategory }) => {
  const scrollToServices = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById("select-service");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation Header */}
      <Navbar
        onOpenLogin={onOpenLogin}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <HeroSection
          onExploreServices={scrollToServices}
          onOpenLogin={onOpenLogin}
        />

        <TrustBadge />

        {/* Section 2: Which service do you want? */}
        <SelectServiceSection
          onSelectCategory={onSelectCategory}
          onOpenLogin={onOpenLogin}
        />

        {/* Section 3: How It Works & CTA Banner */}
        <HowItWorksSection
          onOpenLogin={onOpenLogin}
          onExploreServices={scrollToServices}
        />

        {/* Section 4: Real User Testimonials & Reviews */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
