import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MobileLayout from './components/MobileLayout';

import Splash from './pages/customer/Splash';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import CustomerDashboard from './pages/customer/Dashboard';
import Booking from './pages/customer/Booking';
import Payment from './pages/customer/Payment';
import Profile from './pages/customer/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminBookings from './pages/admin/AdminBookings';

import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Students from './pages/instructor/Students';
import Schedule from './pages/instructor/Schedule';
import InstructorProfile from './pages/instructor/InstructorProfile';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={`/${currentUser.role}/dashboard`} />;
  }

  return children;
};

const CustomerRoutes = () => {
  const { logout } = useAuth();
  return (
    <MobileLayout role="customer" onLogout={logout}>
      <Routes>
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/customer/dashboard" />} />
      </Routes>
    </MobileLayout>
  );
};

const AdminRoutes = () => {
  const { logout } = useAuth();
  return (
    <MobileLayout role="admin" onLogout={logout}>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/vehicles" element={<AdminVehicles />} />
        <Route path="/bookings" element={<AdminBookings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </MobileLayout>
  );
};

const InstructorRoutes = () => {
  const { logout } = useAuth();
  return (
    <MobileLayout role="instructor" onLogout={logout}>
      <Routes>
        <Route path="/dashboard" element={<InstructorDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<InstructorProfile />} />
        <Route path="*" element={<Navigate to="/instructor/dashboard" />} />
      </Routes>
    </MobileLayout>
  );
};

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/customer/*" element={
        <ProtectedRoute allowedRole="customer">
          <CustomerRoutes />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRole="admin">
          <AdminRoutes />
        </ProtectedRoute>
      } />
      
      <Route path="/instructor/*" element={
        <ProtectedRoute allowedRole="instructor">
          <InstructorRoutes />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;