import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, setBookings, getUsers, getVehicles } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const AdminBookings = () => {
  const [bookings, setBookingsData] = useState([]);
  const [users, setUsersData] = useState([]);
  const [vehicles, setVehiclesData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const allBookings = getBookings();
    const allUsers = getUsers();
    const allVehicles = getVehicles();
    setBookingsData(allBookings);
    setUsersData(allUsers);
    setVehiclesData(allVehicles);
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                     b.instructorName.toLowerCase().includes(search.toLowerCase()) ||
                     b.course?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getCustomerName = (id) => users.find(u => u.id === id)?.name || 'Unknown';
  const getInstructorName = (id) => users.find(u => u.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{bookings.length}</p>
            <p className="text-sm text-gray-400">Total Bookings</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-neon-blue">
              {bookings.filter(b => b.status === 'Upcoming' || b.status === 'In Progress').length}
            </p>
            <p className="text-sm text-gray-400">Active</p>
          </div>
        </Card>
      </div>

      <Input
        placeholder="Search bookings..."
        icon={Search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['all', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'].map(f => (
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
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-500 mb-3" size={40} />
              <p className="text-gray-400">No bookings found</p>
            </div>
          </Card>
        ) : (
          filteredBookings.map(booking => (
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
                      <h4 className="text-white font-semibold">{booking.course}</h4>
                      <p className="text-sm text-gray-400">{booking.customerName}</p>
                      <p className="text-sm text-gray-500">Instructor: {booking.instructorName}</p>
                    </div>
                    <span className={`
                      px-2 py-1 text-xs rounded-lg
                      ${booking.status === 'Completed' ? 'bg-neon-green/20 text-neon-green' : 
                        booking.status === 'In Progress' ? 'bg-neon-blue/20 text-neon-blue' : 
                        booking.status === 'Upcoming' ? 'bg-neon-purple/20 text-neon-purple' :
                        'bg-gray-500/20 text-gray-400'}
                    `}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span>{booking.time}</span>
                    <span>{booking.vehicleName}</span>
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
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBookings;