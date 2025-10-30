import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import './Payment.css';

const Payment = ({ bookingDetails, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful!');
      if (onSuccess) onSuccess();
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Complete Payment</h2>
        
        <div className="payment-summary">
          <h3>Booking Summary</h3>
          <div className="summary-row">
            <span>Property:</span>
            <span>{bookingDetails?.propertyName}</span>
          </div>
          <div className="summary-row">
            <span>Check-in:</span>
            <span>{bookingDetails?.checkIn}</span>
          </div>
          <div className="summary-row">
            <span>Check-out:</span>
            <span>{bookingDetails?.checkOut}</span>
          </div>
          <div className="summary-row">
            <span>Guests:</span>
            <span>{bookingDetails?.guests}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>₹{bookingDetails?.totalAmount}</span>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Payment Method</h3>
          <div className="payment-option">
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="razorpay">
              <span>💳 Razorpay (Card/UPI/Wallet)</span>
            </label>
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">
              <span>💵 Pay at Property</span>
            </label>
          </div>
        </div>

        <div className="payment-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${bookingDetails?.totalAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
