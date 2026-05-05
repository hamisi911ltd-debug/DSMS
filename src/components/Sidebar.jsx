import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, ChevronDown, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const getNavLinks = () => {
    if (role === 'student') {
      return [
        { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 border-r border-blue-100 dark:border-slate-700/50 flex flex-col h-screen overflow-y-auto shadow-lg">
      {/* Logo Section */}
      <div className="p-4 border-b border-blue-100 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900 dark:text-white">DSMS</h1>
            <p className="text-xs text-blue-600 dark:text-slate-400">Driving School</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <IconComponent size={20} />
              <span className="font-medium text-sm">{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-blue-100 dark:border-slate-700/50 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-blue-500" /> : <Moon size={20} className="text-blue-600" />}
          <span className="text-sm font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <img
              src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={currentUser?.name}
              className="w-6 h-6 rounded-full ring-2 ring-blue-200 dark:ring-slate-600"
            />
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-blue-600 dark:text-slate-400 capitalize">{role}</p>
            </div>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
              <button
                onClick={() => {
                  navigate(`/${role}/profile`);
                  setProfileOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors border-t border-blue-100 dark:border-slate-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;