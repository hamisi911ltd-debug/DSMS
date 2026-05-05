import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and set a default user
    setTimeout(() => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const login = (email, password) => {
    // Simple login simulation
    const user = {
      id: 1,
      name: 'John Doe',
      email: email,
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    getAllEnrollments: () => [],
    getAllBookings: () => [],
    getAllMessages: () => [],
    getAllUsers: () => [],
    getAllCourses: () => [],
    getAllPayments: () => []
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};