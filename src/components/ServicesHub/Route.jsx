import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ServiceHubLayout from './UI/Layout';
import DoctorList from './Services/DoctorList';
import Carts from './Services/Carts';

const AppRoutes = ({ currentUser, handleLogout, showNotification }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser ? (
            <ServiceHubLayout
              currentUser={currentUser}
              onLogout={handleLogout}
              showNotification={showNotification}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="doctor"
        element={
          currentUser ? (
            <DoctorList
              showNotification={showNotification}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="cart"
        element={
          currentUser ? (
            <Carts showNotification={showNotification} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
