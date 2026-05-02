import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Car, User, CheckCircle, PlayCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, setBookings } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Schedule = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookingsData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const allBookings = getBookings();
    const myBookings = allBookings.filter(b => b.instructorId === currentUser?.id);
    setBookingsData(myBookings);
  }, [currentUser?.id]);

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === 'Upcoming';
    if (filter === 'in_progress') return b.status === 'In Progress';
    if (filter === 'completed') return b.status === 'Completed';
    return true;
  });

  const updateStatus = (bookingId, newStatus) => {
    const allBookings = getBookings();
    const updatedBookings = allBookings.map(b => {
      if (b.id === bookingId) {
        return { 
          ...b, 
          status: newStatus,
          progress: newStatus === 'Completed' ? '100' : 
                    newStatus === 'In Progress' ? '50' : b.progress
        };
      }
      return b;
    });
    setBookings(updatedBookings);
    setBookingsData(updatedBookings.filter(b => b.instructorId === currentUser?.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['all', 'upcoming', 'in_progress', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all
              ${filter === f 
                ? 'bg-neon-blue text-white' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'}
            `}
          >
            {f === 'all' ? 'All' : 
             f === 'upcoming' ? 'Upcoming' : 
             f === 'in_progress' ? 'In Progress' : 'Completed'}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gray-500 mb-3" size={40} />
            <p className="text-gray-400">No bookings found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map(booking => (
            <Card key={booking.id}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {booking.date.split('-')[2]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {booking.date.split('-')[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-semibold">{booking.customerName}</h4>
                      <p className="text-sm text-gray-400">{booking.course}</p>
                    </div>
                    <span className={`
                      px-2 py-1 text-xs rounded-lg
                      ${booking.status === 'Completed' ? 'bg-neon-green/20 text-neon-green' : 
                        booking.status === 'In Progress' ? 'bg-neon-blue/20 text-neon-blue' : 
                        'bg-gray-500/20 text-gray-400'}
                    `}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Car size={14} /> {booking.vehicleName}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-neon-blue">{booking.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neon-blue rounded-full"
                        style={{ width: `${booking.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {booking.status === 'Upcoming' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateStatus(booking.id, 'In Progress')}
                        icon={PlayCircle}
                      >
                        Start
                      </Button>
                    )}
                    {booking.status === 'In Progress' && (
                      <Button 
                        size="sm" 
                        variant="success"
                        onClick={() => updateStatus(booking.id, 'Completed')}
                        icon={CheckCircle}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;