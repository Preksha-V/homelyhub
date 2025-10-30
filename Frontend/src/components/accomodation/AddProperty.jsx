import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import Navbar from '../home/Navbar';
import './AddProperty.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    extraInfo: '',
    propertyType: 'House',
    roomType: 'Anytype',
    maximumGuest: 1,
    price: 500,
    area: '',
    city: '',
    state: '',
    pincode: '',
    checkInTime: '11:00',
    checkOutTime: '13:00'
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    { name: 'Wifi', icon: '📶' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Ac', icon: '❄️' },
    { name: 'Washing Machine', icon: '🧺' },
    { name: 'Tv', icon: '📺' },
    { name: 'Pool', icon: '🏊' },
    { name: 'Free Parking', icon: '🅿️' }
  ];

  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to add a property');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.some(a => a.name === amenity.name)) {
      setSelectedAmenities(selectedAmenities.filter(a => a.name !== amenity.name));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedAmenities.length === 0) {
      toast.error('Please select at least one amenity');
      return;
    }

    try {
      setLoading(true);

      const propertyData = {
        ...formData,
        maximumGuest: parseInt(formData.maximumGuest),
        price: parseInt(formData.price),
        address: {
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: parseInt(formData.pincode)
        },
        amenities: selectedAmenities,
        userId: currentUser._id,
        images: [
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image',
            public_id: 'placeholder'
          },
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image+2',
            public_id: 'placeholder2'
          },
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image+3',
            public_id: 'placeholder3'
          },
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image+4',
            public_id: 'placeholder4'
          },
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image+5',
            public_id: 'placeholder5'
          },
          {
            url: 'https://via.placeholder.com/800x600?text=Property+Image+6',
            public_id: 'placeholder6'
          }
        ]
      };

      const response = await API.post('/properties', propertyData);

      if (response.data.status === 'success') {
        toast.success('Property added successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="container add-property-container">
        <div className="add-property-card">
          <h1>Add Your Property</h1>
          <p className="subtitle">List your property on HomelyHub</p>

          <form onSubmit={handleSubmit} className="add-property-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label>Property Name *</label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleChange}
                  placeholder="Enter property name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Property Type *</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Hotel">Hotel</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Room Type *</label>
                  <select name="roomType" value={formData.roomType} onChange={handleChange}>
                    <option value="Anytype">Anytype</option>
                    <option value="Room">Room</option>
                    <option value="Entire Home">Entire Home</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Additional Information</label>
                <textarea
                  name="extraInfo"
                  value={formData.extraInfo}
                  onChange={handleChange}
                  placeholder="Any extra details about your property"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Property Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Maximum Guests *</label>
                  <input
                    type="number"
                    name="maximumGuest"
                    value={formData.maximumGuest}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price per Night (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Time</label>
                  <input
                    type="time"
                    name="checkInTime"
                    value={formData.checkInTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Check-out Time</label>
                  <input
                    type="time"
                    name="checkOutTime"
                    value={formData.checkOutTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Location</h3>
              
              <div className="form-group">
                <label>Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Area/Locality"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Amenities *</h3>
              <div className="amenities-selector">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity.name}
                    className={`amenity-option ${
                      selectedAmenities.some(a => a.name === amenity.name) ? 'selected' : ''
                    }`}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    <span className="amenity-icon">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
