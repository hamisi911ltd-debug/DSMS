import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, User, Check, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, setBookings, generateId } from '../../utils/storage';
import { courseDetails, timeSlots } from '../../utils/initialData';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const Booking = () => {
  const navigate = useNavigate();
  const { currentUser, getAllUsers, getAllVehicles } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);

  useEffect(() => {
    const allUsers = getAllUsers();
    const instructorList = allUsers.filter(u => u.role === 'instructor');
    setInstructors(instructorList);

    const allVehicles = getAllVehicles();
    setVehicles(allVehicles.filter(v => v.status === 'Available'));

    const allBookings = getBookings();
    setExistingBookings(allBookings);
  }, []);

  const getAvailableSlots = () => {
    if (!selectedDate) return timeSlots;
    const bookedSlots = existingBookings
      .filter(b => b.date === selectedDate && b.instructorId === selectedInstructor)
      .map(b => b.time);
    return timeSlots.filter(t => !bookedSlots.includes(t));
  };

  const handleBook = () => {
    const instructor = instructors.find(i => i.id === selectedInstructor);
    const vehicle = vehicles[0];
    
    const newBooking = {
      id: generateId(),
      customerId: currentUser?.id,
      customerName: currentUser?.name,
      instructorId: selectedInstructor,
      instructorName: instructor?.name,
      vehicleId: vehicle?.id,
      vehicleName: `${vehicle?.make} ${vehicle?.model}`,
      course: selectedCourse?.name,
      date: selectedDate,
      time: selectedTime,
      status: 'Upcoming',
      progress: '0',
      notes: '',
    };

    const allBookings = getBookings();
    setBookings([...allBookings, newBooking]);
    setShowModal(true);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border-neon-green/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Calendar className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Book a Session</h2>
            <p className="text-sm text-gray-400">Step {step} of 4</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full transition-all"
            style={{ width: `${step * 25}%` }}
          />
        </div>
      </Card>

      {step === 1 && (
        <div className="space-y-3 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4">Select Course</h3>
          {courseDetails.map(course => (
            <Card 
              key={course.id}
              hover
              onClick={() => {
                setSelectedCourse(course);
                setStep(2);
              }}
              className={selectedCourse?.id === course.id ? 'border-neon-blue' : ''}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{course.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-neon-blue">₹{course.price}</p>
                  <p className="text-xs text-gray-400">{course.duration}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4">Select Instructor</h3>
          {instructors.map(instructor => (
            <Card 
              key={instructor.id}
              hover
              onClick={() => {
                setSelectedInstructor(instructor.id);
                setStep(3);
              }}
              className={selectedInstructor === instructor.id ? 'border-neon-blue' : ''}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{instructor.name}</h4>
                  <p className="text-sm text-gray-400">{instructor.specialty}</p>
                  <p className="text-xs text-gray-500">{instructor.experience} experience</p>
                </div>
                <ChevronRight className="text-gray-500" size={20} />
              </div>
            </Card>
          ))}
          <Button variant="ghost" onClick={() => setStep(1)} className="mt-4">
            Back
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4">Select Date & Time</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              min={getMinDate()}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
              className="w-full rounded-xl input-glass px-4 py-3"
            />
          </div>

          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => {
                  const isAvailable = getAvailableSlots().includes(time);
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      disabled={!isAvailable}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-3 rounded-xl text-sm font-medium transition-all
                        ${isSelected 
                          ? 'bg-neon-blue text-white' 
                          : isAvailable 
                            ? 'bg-white/5 text-white hover:bg-white/10' 
                            : 'bg-white/5 text-gray-500 cursor-not-allowed'}
                      `}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            onClick={() => setStep(2)}
            className="mt-2"
          >
            Back
          </Button>
        </div>
      )}

      {step === 4 && selectedCourse && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-4">Confirm Booking</h3>
          
          <Card>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Course</span>
                <span className="text-white">{selectedCourse.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Instructor</span>
                <span className="text-white">{instructors.find(i => i.id === selectedInstructor)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time</span>
                <span className="text-white">{selectedTime}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-xl font-bold text-neon-blue">₹{selectedCourse.price}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(3)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleBook} className="flex-1">
              Confirm
            </Button>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        navigate('/customer/dashboard');
      }} title="Booking Confirmed">
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
            <Check className="text-neon-green" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
          <p className="text-gray-400 mb-4">Your booking has been confirmed</p>
          <Button onClick={() => {
            setShowModal(false);
            navigate('/customer/dashboard');
          }} fullWidth>
            Go to Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Booking;