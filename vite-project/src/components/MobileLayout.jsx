import React, { useState } from 'react';
import { Home, Calendar, CreditCard, User, Car, Users, LayoutDashboard, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const adminNavItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/customers', icon: Users, label: 'Students' },
  { path: '/admin/vehicles', icon: Car, label: 'Vehicles' },
  { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
];

const customerNavItems = [
  { path: '/customer/dashboard', icon: Home, label: 'Home' },
  { path: '/customer/booking', icon: Calendar, label: 'Book' },
  { path: '/customer/payments', icon: CreditCard, label: 'Pay' },
  { path: '/customer/profile', icon: User, label: 'Profile' },
];

const instructorNavItems = [
  { path: '/instructor/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/instructor/students', icon: Users, label: 'Students' },
  { path: '/instructor/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/instructor/profile', icon: User, label: 'Profile' },
];

const MobileLayout = ({ children, role, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getNavItems = () => {
    switch (role) {
      case 'admin': return adminNavItems;
      case 'instructor': return instructorNavItems;
      default: return customerNavItems;
    }
  };

  const navItems = getNavItems();

  const getRoleTitle = () => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'instructor': return 'Instructor';
      default: return 'Student';
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full glass border-r border-white/10 transition-all duration-300 z-40"
        style={{ width: sidebarOpen ? '260px' : '70px' }}>
        
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className="p-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <Car size={20} />
              </div>
              <div>
                <h1 className="font-bold text-white">DSMS</h1>
                <p className="text-xs text-gray-400">{getRoleTitle()}</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center mx-auto">
              <Car size={20} />
            </div>
          )}
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 transition-all duration-200
                  ${isActive 
                    ? 'bg-neon-blue/20 text-neon-blue border-r-2 border-neon-blue' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  ${!sidebarOpen ? 'justify-center' : ''}
                `}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors
              ${!sidebarOpen ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-4 pb-16 md:pt-4 md:pb-4 md:pl-0">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 py-2 md:hidden">
        <div className="flex justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]
                  ${isActive 
                    ? 'text-neon-blue bg-neon-blue/10' 
                    : 'text-gray-400 hover:text-white'}
                `}
              >
                <Icon size={20} />
                <span className="text-[10px] truncate w-full text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;