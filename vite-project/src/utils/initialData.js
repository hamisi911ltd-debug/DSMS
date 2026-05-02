import { getUsers, getVehicles, setData } from './storage';
import { STORAGE_KEYS } from './storage';

export const initializeData = () => {
  const existingUsers = getUsers();
  
  if (existingUsers.length === 0) {
    const defaultUsers = [
      {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@dsms.com',
        password: 'admin123',
        phone: '1234567890',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'instructor1',
        name: 'John Smith',
        email: 'john@dsms.com',
        password: 'john123',
        phone: '9876543210',
        role: 'instructor',
        specialty: 'Beginner',
        experience: '5 years',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'instructor2',
        name: 'Sarah Johnson',
        email: 'sarah@dsms.com',
        password: 'sarah123',
        phone: '1234567891',
        role: 'instructor',
        specialty: 'Advanced',
        experience: '8 years',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'customer1',
        name: 'Mike Wilson',
        email: 'mike@email.com',
        password: 'mike123',
        phone: '1234567892',
        role: 'customer',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'customer2',
        name: 'Emily Brown',
        email: 'emily@email.com',
        password: 'emily123',
        phone: '1234567893',
        role: 'customer',
        createdAt: new Date().toISOString(),
      },
    ];
    setData(STORAGE_KEYS.USERS, defaultUsers);
  }

  const existingVehicles = getVehicles();
  
  if (existingVehicles.length === 0) {
    const defaultVehicles = [
      {
        id: 'vehicle1',
        make: 'Toyota',
        model: 'Corolla',
        year: '2023',
        plateNumber: 'ABC 123',
        type: 'Automatic',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1621007047382-8b3f0e1b3e4a?w=400',
      },
      {
        id: 'vehicle2',
        make: 'Honda',
        model: 'Civic',
        year: '2022',
        plateNumber: 'XYZ 789',
        type: 'Manual',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=400',
      },
      {
        id: 'vehicle3',
        make: 'Hyundai',
        model: 'i20',
        year: '2023',
        plateNumber: 'DEF 456',
        type: 'Automatic',
        status: 'In Use',
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
      },
      {
        id: 'vehicle4',
        make: 'Maruti',
        model: 'Swift',
        year: '2021',
        plateNumber: 'GHI 012',
        type: 'Manual',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1602081018481-44eb4eed7f63?w=400',
      },
    ];
    setData(STORAGE_KEYS.VEHICLES, defaultVehicles);
  }

  const defaultBookings = [
    {
      id: 'booking1',
      customerId: 'customer1',
      customerName: 'Mike Wilson',
      instructorId: 'instructor1',
      instructorName: 'John Smith',
      vehicleId: 'vehicle1',
      vehicleName: 'Toyota Corolla',
      course: 'Beginner',
      date: '2026-04-20',
      time: '09:00',
      status: 'Completed',
      progress: '100',
      notes: 'Excellent progress',
    },
    {
      id: 'booking2',
      customerId: 'customer1',
      customerName: 'Mike Wilson',
      instructorId: 'instructor1',
      instructorName: 'John Smith',
      vehicleId: 'vehicle2',
      vehicleName: 'Honda Civic',
      course: 'Beginner',
      date: '2026-04-22',
      time: '10:00',
      status: 'Upcoming',
      progress: '50',
      notes: 'Need more practice on turns',
    },
    {
      id: 'booking3',
      customerId: 'customer2',
      customerName: 'Emily Brown',
      instructorId: 'instructor2',
      instructorName: 'Sarah Johnson',
      vehicleId: 'vehicle1',
      vehicleName: 'Toyota Corolla',
      course: 'Advanced',
      date: '2026-04-21',
      time: '14:00',
      status: 'In Progress',
      progress: '30',
      notes: 'Good parallel parking',
    },
  ];
  setData(STORAGE_KEYS.BOOKINGS, defaultBookings);

  const defaultPayments = [
    {
      id: 'payment1',
      bookingId: 'booking1',
      customerId: 'customer1',
      amount: 5000,
      method: 'UPI',
      status: 'Success',
      date: '2026-04-15',
    },
  ];
  setData(STORAGE_KEYS.PAYMENTS, defaultPayments);
};

export const courseDetails = [
  {
    id: 'beginner',
    name: 'Beginner Course',
    duration: '10 hours',
    price: 5000,
    description: 'Perfect for those who have never driven before. Learn the basics of driving.',
    features: ['Basic traffic rules', 'Vehicle controls', 'Starting & stopping', 'Straight driving', 'Turning', 'Parking basics'],
  },
  {
    id: 'intermediate',
    name: 'Intermediate Course',
    duration: '15 hours',
    price: 7500,
    description: 'For those with some driving experience. Improve your skills and confidence.',
    features: ['Advanced turns', 'Lane changing', 'Highway driving', 'Night driving', 'Reverse parking', 'Roundabouts'],
  },
  {
    id: 'advanced',
    name: 'Advanced Course',
    duration: '20 hours',
    price: 10000,
    description: 'Master advanced driving techniques. Prepare for any driving situation.',
    features: ['Parallel parking', 'Emergency braking', 'Defensive driving', ' Adverse weather', 'City driving', 'Test preparation'],
  },
  {
    id: 'refresher',
    name: 'Refresher Course',
    duration: '5 hours',
    price: 2500,
    description: 'Refresh your driving skills. Great for those returning to driving after a break.',
    features: ['Skill assessment', 'Practice sessions', 'Confidence building', 'Customized training'],
  },
];

export const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];