import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Car, TrendingUp, DollarSign, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, getUsers, getVehicles, getPayments } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [stats, setStats] = useState({
    customers: 0,
    instructors: 0,
    bookings: 0,
    vehicles: 0,
    revenue: 0,
  });

  useEffect(() => {
    const allUsers = getUsers();
    const allBookings = getBookings();
    const allVehicles = getVehicles();
    const allPayments = getPayments();

    setStats({
      customers: allUsers.filter(u => u.role === 'customer').length,
      instructors: allUsers.filter(u => u.role === 'instructor').length,
      bookings: allBookings.length,
      vehicles: allVehicles.length,
      revenue: allPayments
        .filter(p => p.status === 'Success')
        .reduce((sum, p) => sum + p.amount, 0),
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border-neon-blue/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Welcome back,</p>
            <h2 className="text-2xl font-bold text-white">{currentUser?.name}</h2>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card hover onClick={() => navigate('/admin/customers')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Users className="text-neon-blue" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.customers}</p>
            <p className="text-xs text-gray-400">Students</p>
          </div>
        </Card>

        <Card hover onClick={() => navigate('/admin/customers')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
              <Users className="text-neon-purple" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.instructors}</p>
            <p className="text-xs text-gray-400">Instructors</p>
          </div>
        </Card>

        <Card hover onClick={() => navigate('/admin/bookings')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <Calendar className="text-neon-green" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.bookings}</p>
            <p className="text-xs text-gray-400">Bookings</p>
          </div>
        </Card>

        <Card hover onClick={() => navigate('/admin/vehicles')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-pink/20 flex items-center justify-center">
              <Car className="text-neon-pink" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{stats.vehicles}</p>
            <p className="text-xs text-gray-400">Vehicles</p>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-neon-green/20 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <DollarSign className="text-neon-green" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{stats.revenue.toLocaleString()}</p>
            </div>
          </div>
          <TrendingUp className="text-neon-green" size={24} />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => navigate('/admin/customers')}>
          Manage Users
        </Button>
        <Button variant="secondary" onClick={() => navigate('/admin/vehicles')}>
          Manage Vehicles
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;