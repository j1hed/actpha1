import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  Pill
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  console.log('DashboardLayout rendering', { children }); // Debug log

  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/dashboard/medications',
      name: 'Medications',
      icon: Pill
    },
    {
      path: '/dashboard/settings',
      name: 'Settings',
      icon: Settings
    }
  ];

  console.log('DashboardLayout rendering', { children }); // Debug log

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-200">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">ACT Pharma</h1>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200">
            {/* Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <div className="flex items-center gap-2">
                  <ChevronLeft className="h-5 w-5" />
                  <span>Collapse</span>
                </div>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-2 mt-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-all"
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
