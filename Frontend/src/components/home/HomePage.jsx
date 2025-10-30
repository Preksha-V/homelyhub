import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../utils/api';
import {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure
} from '../../store/propertySlice';
import LoadingSpinner from '../LoadingSpinner';
import Navbar from './Navbar';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.property);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      dispatch(fetchPropertiesStart());
      const response = await API.get('/properties');
      dispatch(fetchPropertiesSuccess(response.data.data.properties));
    } catch (error) {
      dispatch(fetchPropertiesFailure(error.message));
      toast.error('Failed to load properties');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCity.trim()) {
      fetchProperties();
      return;
    }
    
    try {
      dispatch(fetchPropertiesStart());
      const response = await API.get(`/properties/search/${searchCity}`);
      dispatch(fetchPropertiesSuccess(response.data.data.properties));
      if (response.data.results === 0) {
        toast.error('No properties found in this city');
      }
    } catch (error) {
      toast.error('Search failed');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Discover amazing places to stay around the world</p>
          
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by city (e.g., Goa, Mumbai, Delhi)"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Featured Properties</h2>
        
        <div className="properties-grid">
          {properties.map((property) => (
            <Link 
              to={`/property/${property._id}`} 
              key={property._id}
              className="property-card"
            >
              <div className="property-image">
                <img 
                  src={property.images[0]?.url || '/placeholder.jpg'} 
                  alt={property.propertyName}
                />
              </div>
              <div className="property-info">
                <h3>{property.propertyName}</h3>
                <p className="property-location">
                  📍 {property.address.city}, {property.address.state}
                </p>
                <p className="property-type">{property.propertyType}</p>
                <div className="property-footer">
                  <span className="property-price">₹{property.price}/night</span>
                  <span className="property-guests">👥 {property.maximumGuest} guests</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="no-properties">
            <p>No properties available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
