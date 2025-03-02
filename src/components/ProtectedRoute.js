import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true"; // Check authentication

  return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
