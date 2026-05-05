import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/MainLayout';

// Auth Pages
import Splash from './pages/customer/Splash';
import Login from './pages/customer/Login';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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

const StudentRoutes = () => {
  return (
    <MainLayout role="student">
      <Routes>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/student/dashboard" />} />
      </Routes>
    </MainLayout>
  );
};

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/student/*" element={
        <ProtectedRoute allowedRole="student">
          <StudentRoutes />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;