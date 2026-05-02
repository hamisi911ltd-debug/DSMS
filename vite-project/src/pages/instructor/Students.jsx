import React, { useEffect, useState } from 'react';
import { User, Search, TrendingUp, Clock, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, getUsers } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Students = () => {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const allBookings = getBookings();
    const myBookings = allBookings.filter(b => b.instructorId === currentUser?.id);
    
    const studentMap = new Map();
    myBookings.forEach(booking => {
      if (!studentMap.has(booking.customerId)) {
        studentMap.set(booking.customerId, {
          customerId: booking.customerId,
          customerName: booking.customerName,
          bookings: [],
        });
      }
      studentMap.get(booking.customerId).bookings.push(booking);
    });
    
    setStudents(Array.from(studentMap.values()));
  }, [currentUser?.id]);

  const filteredStudents = students.filter(s => 
    s.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search students..."
        icon={Search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {filteredStudents.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <User className="mx-auto text-gray-500 mb-3" size={40} />
            <p className="text-gray-400">No students found</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredStudents.map(student => {
            const completed = student.bookings.filter(b => b.status === 'Completed').length;
            const total = student.bookings.length;
            const progress = total > 0 
              ? Math.round(student.bookings.reduce((sum, b) => sum + (parseInt(b.progress) || 0), 0) / total) 
              : 0;

            return (
              <Card key={student.customerId} hover onClick={() => setSelectedStudent(student)}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{student.customerName}</h4>
                    <p className="text-sm text-gray-400">{total} sessions • {completed} completed</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-neon-blue rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{progress}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          <div className="relative w-full max-w-sm glass-card rounded-2xl p-6 animate-slide-up">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
                <User size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{selectedStudent.customerName}</h3>
            </div>

            <div className="space-y-3">
              <Card>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Sessions</span>
                  <span className="text-white font-semibold">{selectedStudent.bookings.length}</span>
                </div>
              </Card>
              <Card>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-neon-green font-semibold">
                    {selectedStudent.bookings.filter(b => b.status === 'Completed').length}
                  </span>
                </div>
              </Card>
              <Card>
                <h4 className="text-white font-semibold mb-3">Session History</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedStudent.bookings.map(booking => (
                    <div key={booking.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-white/5">
                      <span className="text-gray-300">{booking.date}</span>
                      <span className="text-gray-400">{booking.course}</span>
                      <span className={`
                        px-2 py-0.5 rounded text-xs
                        ${booking.status === 'Completed' ? 'bg-neon-green/20 text-neon-green' : 
                          booking.status === 'In Progress' ? 'bg-neon-blue/20 text-neon-blue' : 
                          'bg-gray-500/20 text-gray-400'}
                      `}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Button variant="ghost" onClick={() => setSelectedStudent(null)} fullWidth className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;