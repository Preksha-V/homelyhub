import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`} className="property-card-link">
      <div className="property-card-item">
        <div className="property-card-image">
          <img 
            src={property.images[0]?.url || '/placeholder.jpg'} 
            alt={property.propertyName}
          />
          <div className="property-badge">{property.propertyType}</div>
        </div>
        
        <div className="property-card-content">
          <h3>{property.propertyName}</h3>
          <p className="property-card-location">
            📍 {property.address.city}, {property.address.state}
          </p>
          
          <div className="property-card-amenities">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="amenity-badge">
                {amenity.icon} {amenity.name}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="amenity-badge">+{property.amenities.length - 3} more</span>
            )}
          </div>
          
          <div className="property-card-footer">
            <div className="property-card-price">
              <span className="price">{formatCurrency(property.price)}</span>
              <span className="price-period">/night</span>
            </div>
            <div className="property-card-guests">
              👥 {property.maximumGuest} guests
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
