import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import API from '../../utils/api';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingModal.css';

const BookingModal = ({ property, onClose, userId }) => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateNights = () => {
    if (fromDate && toDate) {
      return moment(toDate).diff(moment(fromDate), 'days');
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * property.price;
  };

  const handleBooking = async () => {
    if (!fromDate || !toDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (guests > property.maximumGuest) {
      toast.error(`Maximum ${property.maximumGuest} guests allowed`);
      return;
    }

    if (calculateNights() < 1) {
      toast.error('Minimum 1 night stay required');
      return;
    }

    try {
      setLoading(true);
      
      const bookingData = {
        property: property._id,
        user: userId,
        fromDate,
        toDate,
        guests,
        numberOfnights: calculateNights(),
        price: calculateTotalPrice()
      };

      const response = await API.post('/bookings', bookingData);
      
      if (response.data.status === 'success') {
        toast.success('Booking confirmed successfully!');
        navigate('/mybookings');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book {property.propertyName}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="booking-form">
            <div className="form-group">
              <label>Check-in Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select check-in date"
                className="date-input"
              />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                minDate={fromDate || new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select check-out date"
                className="date-input"
              />
            </div>

            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                min="1"
                max={property.maximumGuest}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="guest-input"
              />
              <small>Maximum {property.maximumGuest} guests</small>
            </div>

            {fromDate && toDate && (
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-item">
                  <span>Nights:</span>
                  <span>{calculateNights()} nights</span>
                </div>
                <div className="summary-item">
                  <span>Price per night:</span>
                  <span>₹{property.price}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <span>₹{calculateTotalPrice()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleBooking}
            disabled={loading || !fromDate || !toDate}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
