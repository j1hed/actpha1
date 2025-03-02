import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DashboardLayout from './components/DashboardLayout';
import './App.css';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Product = React.lazy(() => import('./pages/Product'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Medications = React.lazy(() => import('./pages/Medications'));

// Layout component for public pages
const PublicLayout = ({ children }) => (
  <div className="site-wrapper">
    <Header />
    <main className="main-content">{children}</main>
    <Footer />
  </div>
);

// Main App Component
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            
          } />

          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><Product /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/dashboard/medications" element={
              <ProtectedRoute>
                  <DashboardLayout>
                      <Medications />
                  </DashboardLayout>
              </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
