import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPropertyDetails } from '../store/propertyDetails/propertyDetailsAction';
import LoadingSpinner from './loadingSpinner';
import PropertyImage from './propertyImage';
import PropertyAmenities from './propertyAmenities';
import PropertyMapInfo from './propertyListing/PropertyMapInfo';
import PropertyList from "./PropertyList";


function PropertyListing() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, propertyDetails } = useSelector(state => state.propertyDetails);

  useEffect(() => {
    dispatch(getPropertyDetails(id));
  }, [dispatch, id]);

  if (loading || !propertyDetails) {
    return (
      <div className="row justify-content-around empty-5">
        <LoadingSpinner />
        <PropertyList properties={properties} />
      </div>
    );
  }

  // Destructure dynamic property details
  const {
    propertyName,
    address,
    description,
    images,
    amenities,
    maximumGuest,
  } = propertyDetails;

  return (
    <div>
      <h1>{propertyName}</h1>
      <span>
        {`${address?.area}, ${address?.city}, ${address?.state}`}
      </span>
      <PropertyImage images={images} />
      <p>{description}</p>
      <span>Maximum guests: {maximumGuest}</span>
      <PropertyAmenities amenities={amenities} />
      <PropertyMapInfo address={address} />
    </div>
  );
}
export default PropertyListing;
