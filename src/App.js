import React, { useState } from "react";
import HomePage from "./components/home/HomePage";
import ServiceHubLayout from "./components/ServicesHub/UI/Layout";
import AuthModal from "./components/auth/AuthModal";
import NotificationToast from "./components/common/NotificationToast";
import { getStoredUser, clearAuthData } from "./components/auth/authService";

function App() {
  const [notification, setNotification] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
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
    <>
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {currentUser ? (
        <ServiceHubLayout
          currentUser={currentUser}
          onLogout={handleLogout}
          showNotification={showNotification}
        />
      ) : (
        <HomePage
          currentUser={currentUser}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onSelectCategory={() => setIsAuthModalOpen(true)}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
