import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, getCurrentUser, setCurrentUser, clearCurrentUser, setUsers, getBookings, getPayments, getVehicles } from '../utils/storage';
import { initializeData } from '../utils/initialData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      ...userData,
      id: `user_${Date.now()}`,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    setUser(userWithoutPassword);
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  const updateUser = (updates) => {
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? { ...u, ...updates } : u
    );
    setUsers(updatedUsers);
    const { password: _, ...userWithoutPassword } = { ...currentUser, ...updates };
    setCurrentUser(userWithoutPassword);
    setUser(userWithoutPassword);
  };

  const getAllUsers = () => getUsers();
  
  const getAllBookings = () => getBookings();
  
  const getAllPayments = () => getPayments();
  
  const getAllVehicles = () => getVehicles();

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      register,
      logout,
      updateUser,
      getAllUsers,
      getAllBookings,
      getAllPayments,
      getAllVehicles,
    }}>
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