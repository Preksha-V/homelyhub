import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment';
import API from '../../utils/api';
import Navbar from '../home/Navbar';
import LoadingSpinner from '../LoadingSpinner';
import BookingModal from './BookingModal';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/properties/${id}`);
      setProperty(response.data.data.property);
    } catch (error) {
      toast.error('Failed to load property details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a property');
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  if (loading) return <LoadingSpinner />;
  if (!property) return null;

  return (
    <div>
      <Navbar />
      
      <div className="container property-details-container">
        <div className="property-details-header">
          <h1>{property.propertyName}</h1>
          <p className="property-location-detail">
            📍 {property.address.area}, {property.address.city}, {property.address.state} - {property.address.pincode}
          </p>
        </div>

        <div className="property-images-grid">
          <div className="main-image">
            <img 
              src={property.images[selectedImage]?.url || '/placeholder.jpg'} 
              alt={property.propertyName}
            />
          </div>
          <div className="thumbnail-images">
            {property.images.slice(0, 5).map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`${property.propertyName} ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={selectedImage === index ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        <div className="property-content">
          <div className="property-main-content">
            <div className="property-info-section">
              <h2>About this property</h2>
              <div className="property-badges">
                <span className="badge">{property.propertyType}</span>
                <span className="badge">{property.roomType}</span>
                <span className="badge">👥 {property.maximumGuest} Guests</span>
              </div>
              <p className="property-description">{property.description}</p>
              <p className="property-extra-info">{property.extraInfo}</p>
            </div>

            <div className="amenities-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="check-times-section">
              <h2>Check-in & Check-out</h2>
              <div className="check-times">
                <div className="check-time-item">
                  <span className="check-label">Check-in:</span>
                  <span className="check-value">{property.checkInTime}</span>
                </div>
                <div className="check-time-item">
                  <span className="check-label">Check-out:</span>
                  <span className="check-value">{property.checkOutTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="property-sidebar">
            <div className="booking-card">
              <div className="price-section">
                <span className="price">₹{property.price}</span>
                <span className="price-label">per night</span>
              </div>
              
              <button 
                className="btn btn-primary btn-block"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              
              <div className="booking-info">
                <p>✓ Free cancellation</p>
                <p>✓ Instant confirmation</p>
                <p>✓ Best price guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          property={property}
          onClose={() => setShowBookingModal(false)}
          userId={currentUser?._id}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
