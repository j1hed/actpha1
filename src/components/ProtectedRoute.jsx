import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  console.log('ProtectedRoute rendering', { children }); // Debug log

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      console.log('Checking authentication...', { token: !!token });
      // Optionally, add more validation for the token here
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authenticated, rendering protected content...');
  return children; // Render the protected content
};

export default ProtectedRoute;
