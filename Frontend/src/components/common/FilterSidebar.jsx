import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 500, max: 10000 },
    propertyType: '',
    amenities: []
  });

  const propertyTypes = ['House', 'Flat', 'Guest House', 'Hotel'];
  const amenitiesList = ['Wifi', 'Kitchen', 'Ac', 'Washing Machine', 'Tv', 'Pool', 'Free Parking'];

  const handlePriceChange = (value) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePropertyTypeChange = (type) => {
    const newFilters = { 
      ...filters, 
      propertyType: filters.propertyType === type ? '' : type 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      priceRange: { min: 500, max: 10000 },
      propertyType: '',
      amenities: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={clearFilters} className="clear-btn">Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range-container">
          <InputRange
            maxValue={10000}
            minValue={500}
            value={filters.priceRange}
            onChange={handlePriceChange}
            formatLabel={value => `₹${value}`}
          />
          <div className="price-labels">
            <span>₹{filters.priceRange.min}</span>
            <span>₹{filters.priceRange.max}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Property Type</h4>
        <div className="filter-options">
          {propertyTypes.map(type => (
            <div
              key={type}
              className={`filter-option ${filters.propertyType === type ? 'active' : ''}`}
              onClick={() => handlePropertyTypeChange(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Amenities</h4>
        <div className="filter-checkboxes">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
