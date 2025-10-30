import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import API from '../../utils/api';
import Navbar from '../home/Navbar';
import LoadingSpinner from '../LoadingSpinner';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, currentUser]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/bookings/user/${currentUser._id}`);
      setBookings(response.data.data.bookings);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await API.delete(`/bookings/${bookingId}`);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Navbar />
      
      <div className="container bookings-container">
        <h1 className="page-title">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You don't have any bookings yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  <img 
                    src={booking.property?.images[0]?.url || '/placeholder.jpg'}
                    alt={booking.property?.propertyName}
                  />
                </div>

                <div className="booking-details">
                  <h3>{booking.property?.propertyName}</h3>
                  <p className="booking-location">
                    📍 {booking.property?.address?.city}, {booking.property?.address?.state}
                  </p>

                  <div className="booking-dates">
                    <div className="date-item">
                      <span className="date-label">Check-in:</span>
                      <span className="date-value">
                        {moment(booking.fromDate).format('DD MMM YYYY')}
                      </span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Check-out:</span>
                      <span className="date-value">
                        {moment(booking.toDate).format('DD MMM YYYY')}
                      </span>
                    </div>
                  </div>

                  <div className="booking-info-row">
                    <span>👥 {booking.guests} Guests</span>
                    <span>🌙 {booking.numberOfnights} Nights</span>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-price">
                      <span className="price-label">Total Paid:</span>
                      <span className="price-value">₹{booking.price}</span>
                    </div>
                    <button 
                      className="btn btn-secondary btn-cancel"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
