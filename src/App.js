import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AppRoutes from "./components/ServicesHub/Route";
import AuthModal from "./components/auth/AuthModal";
import NotificationToast from "./components/common/NotificationToast";
import { getStoredUser, clearAuthData } from "./components/auth/authService";

function App() {
  const [notification, setNotification] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const navigate = useNavigate();

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAuthSuccess = ({ user, message }) => {
    setCurrentUser(user);
    showNotification(message || `Welcome, ${user.name}!`);
    navigate("/services");
  };

  const handleLogout = () => {
    clearAuthData();
    setCurrentUser(null);
    showNotification("Logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/services" replace />
            ) : (
              <HomePage
                currentUser={currentUser}
                onOpenLogin={() => setIsAuthModalOpen(true)}
                onLogout={handleLogout}
                onSelectCategory={() => setIsAuthModalOpen(true)}
              />
            )
          }
        />
        <Route
          path="/services/*"
          element={
            <AppRoutes
              currentUser={currentUser}
              handleLogout={handleLogout}
              showNotification={showNotification}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
