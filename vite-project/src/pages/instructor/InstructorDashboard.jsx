import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Car, TrendingUp, Clock, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = getBookings();
    const myBookings = allBookings.filter(b => b.instructorId === currentUser?.id);
    setBookings(myBookings);
  }, [currentUser?.id]);

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today);
  const upcomingBookings = bookings.filter(b => b.status === 'Upcoming');
  const completedSessions = bookings.filter(b => b.status === 'Completed').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-neon-purple/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Welcome,</p>
            <h2 className="text-2xl font-bold text-white">{currentUser?.name}</h2>
            <p className="text-sm text-gray-400">{currentUser?.specialty || 'Instructor'}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
              <Calendar className="text-neon-blue" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{todayBookings.length}</p>
            <p className="text-xs text-gray-400">Today</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <Clock className="text-neon-green" size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{upcomingBookings.length}</p>
            <p className="text-xs text-gray-400">Upcoming</p>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-neon-green/10 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center">
              <CheckCircle className="text-neon-green" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Completed Sessions</p>
              <p className="text-2xl font-bold text-white">{completedSessions}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/instructor/schedule')}>
            View All
          </Button>
        </div>

        {todayBookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-500 mb-3" size={40} />
            <p className="text-gray-400">No sessions today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayBookings.map(booking => (
              <div 
                key={booking.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
              >
                <div className="w-14 h-14 rounded-xl bg-neon-blue/20 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-neon-blue">{booking.time.split(':')[0]}</span>
                  <span className="text-xs text-gray-400">{booking.time.split(':')[1]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{booking.customerName}</p>
                  <p className="text-sm text-gray-400">{booking.course} • {booking.vehicleName}</p>
                </div>
                <span className={`
                  px-2 py-1 text-xs rounded-lg
                  ${booking.status === 'Upcoming' ? 'bg-neon-blue/20 text-neon-blue' : ''}
                  ${booking.status === 'In Progress' ? 'bg-neon-green/20 text-neon-green' : ''}
                `}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default InstructorDashboard;