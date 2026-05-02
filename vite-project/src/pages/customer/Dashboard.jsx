import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, TrendingUp, BookOpen, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, getPayments } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const allBookings = getBookings();
    const userBookings = allBookings.filter(b => b.customerId === currentUser?.id);
    setBookings(userBookings);

    const allPayments = getPayments();
    const userPayments = allPayments.filter(p => p.customerId === currentUser?.id);
    setPayments(userPayments);
  }, [currentUser?.id]);

  const activeBookings = bookings.filter(b => b.status !== 'Completed');
  const completedSessions = bookings.filter(b => b.status === 'Completed').length;
  const totalSpent = payments
    .filter(p => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);
  const avgProgress = bookings.length > 0
    ? Math.round(bookings.reduce((sum, b) => sum + (parseInt(b.progress) || 0), 0) / bookings.length)
    : 0;

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
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card hover onClick={() => navigate('/customer/booking')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Calendar className="text-neon-blue" size={24} />
            </div>
            <p className="text-sm text-gray-300">Book Session</p>
          </div>
        </Card>

        <Card hover onClick={() => navigate('/customer/payments')}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
              <CreditCard className="text-neon-purple" size={24} />
            </div>
            <p className="text-sm text-gray-300">Payments</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Your Progress</h3>
          <TrendingUp className="text-neon-green" size={20} />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Completion</span>
              <span className="text-neon-blue">{avgProgress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-500"
                style={{ width: `${avgProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-white">{bookings.length}</p>
            <p className="text-xs text-gray-400">Sessions</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-neon-green">{completedSessions}</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-neon-purple">₹{totalSpent.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Spent</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Upcoming Sessions</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/customer/booking')}>
            <ArrowRight size={18} />
          </Button>
        </div>

        {activeBookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-500 mb-3" size={40} />
            <p className="text-gray-400">No upcoming sessions</p>
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-3"
              onClick={() => navigate('/customer/booking')}
            >
              Book Now
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeBookings.slice(0, 3).map(booking => (
              <div 
                key={booking.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                  <Car className="text-neon-blue" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{booking.course}</p>
                  <p className="text-sm text-gray-400">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`
                    px-2 py-1 text-xs rounded-lg
                    ${booking.status === 'Upcoming' ? 'bg-neon-blue/20 text-neon-blue' : ''}
                    ${booking.status === 'In Progress' ? 'bg-neon-green/20 text-neon-green' : ''}
                  `}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;