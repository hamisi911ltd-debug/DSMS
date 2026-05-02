import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Receipt, Check, X, Wallet, Smartphone, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPayments, getBookings, setPayments, generateId } from '../../utils/storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const Payment = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [payments, setPaymentsData] = useState([]);
  const [bookings, setBookingsData] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const allPayments = getPayments();
    const userPayments = allPayments.filter(p => p.customerId === currentUser?.id);
    setPaymentsData(userPayments);

    const allBookings = getBookings();
    const userBookings = allBookings.filter(b => b.customerId === currentUser?.id);
    setBookingsData(userBookings);

    const pending = userBookings
      .filter(b => b.status !== 'Completed')
      .map(b => ({
        booking: b,
        payment: userPayments.find(p => p.bookingId === b.id && p.status === 'Success')
      }))
      .filter(item => !item.payment);
    setPendingPayments(pending);
  }, [currentUser?.id]);

  const totalPending = pendingPayments.reduce((sum, item) => {
    if (item.booking.course === 'Beginner Course') return sum + 5000;
    if (item.booking.course === 'Intermediate Course') return sum + 7500;
    if (item.booking.course === 'Advanced Course') return sum + 10000;
    return sum + 2500;
  }, 0);

  const handlePayment = (booking) => {
    setSelectedPayment(booking);
    setShowModal(true);
  };

  const processPayment = () => {
    setProcessing(true);
    
    setTimeout(() => {
      const success = Math.random() > 0.2;
      
      if (success) {
        const newPayment = {
          id: generateId(),
          bookingId: selectedPayment.booking.id,
          customerId: currentUser?.id,
          amount: selectedPayment.booking.course === 'Beginner Course' ? 5000 :
                 selectedPayment.booking.course === 'Intermediate Course' ? 7500 :
                 selectedPayment.booking.course === 'Advanced Course' ? 10000 : 2500,
          method: paymentMethod,
          status: 'Success',
          date: new Date().toISOString().split('T')[0],
        };
        
        const allPayments = getPayments();
        setPayments([...allPayments, newPayment]);
        
        setPaymentsData(prev => [...prev, newPayment]);
        setPendingPayments(prev => prev.filter(p => p.booking.id !== selectedPayment.booking.id));
      }
      
      setProcessing(false);
      setShowModal(false);
      
      if (success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed. Please try again.');
      }
    }, 1500);
  };

  const paymentMethods = [
    { id: 'UPI', icon: Smartphone, label: 'UPI' },
    { id: 'Card', icon: CreditCard, label: 'Card' },
    { id: 'Net Banking', icon: Building, label: 'Net Banking' },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border-neon-purple/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Pending Payments</p>
            <p className="text-2xl font-bold text-white">₹{totalPending.toLocaleString()}</p>
          </div>
          <CreditCard className="text-neon-purple" size={32} />
        </div>
      </Card>

      {pendingPayments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Pay Now</h3>
          <div className="space-y-3">
            {pendingPayments.map(item => (
              <Card key={item.booking.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{item.booking.course}</h4>
                    <p className="text-sm text-gray-400">{item.booking.date} at {item.booking.time}</p>
                  </div>
                  <p className="text-neon-blue font-bold">
                    ₹{item.booking.course === 'Beginner Course' ? 5000 :
                      item.booking.course === 'Intermediate Course' ? 7500 :
                      item.booking.course === 'Advanced Course' ? 10000 : 2500}
                  </p>
                </div>
                <Button onClick={() => handlePayment(item)} fullWidth>
                  Pay Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Payment History</h3>
        {payments.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <Receipt className="mx-auto text-gray-500 mb-3" size={40} />
              <p className="text-gray-400">No payment history</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {payments.map(payment => (
              <Card key={payment.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-medium">₹{payment.amount}</h4>
                    <p className="text-sm text-gray-400">{payment.method} • {payment.date}</p>
                  </div>
                  <span className={`
                    px-3 py-1 text-sm rounded-lg
                    ${payment.status === 'Success' ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-400'}
                  `}>
                    {payment.status === 'Success' ? (
                      <><Check size={14} className="inline mr-1" />Success</>
                    ) : (
                      <><X size={14} className="inline mr-1" />Failed</>
                    )}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Make Payment" size="md">
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Amount</span>
              <span className="text-neon-blue font-bold">
                ₹{selectedPayment?.booking.course === 'Beginner Course' ? 5000 :
                  selectedPayment?.booking.course === 'Intermediate Course' ? 7500 :
                  selectedPayment?.booking.course === 'Advanced Course' ? 10000 : 2500}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Session</span>
              <span className="text-white">{selectedPayment?.booking.date}</span>
            </div>
          </Card>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                      ${paymentMethod === method.id 
                        ? 'bg-neon-blue text-white' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'}
                    `}
                  >
                    <Icon size={24} />
                    <span className="text-sm">{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {paymentMethod === 'Card' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                className="w-full rounded-xl input-glass px-4 py-3"
                maxLength={16}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full rounded-xl input-glass px-4 py-3"
                  maxLength={5}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="w-full rounded-xl input-glass px-4 py-3"
                  maxLength={3}
                />
              </div>
            </div>
          )}

          <Button onClick={processPayment} fullWidth disabled={processing}>
            {processing ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;