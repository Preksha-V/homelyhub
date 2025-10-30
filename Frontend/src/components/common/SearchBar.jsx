import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: null,
    checkOut: null,
    guests: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    } else {
      // Navigate with query params
      const params = new URLSearchParams({
        city: searchData.city,
        checkIn: searchData.checkIn?.toISOString() || '',
        checkOut: searchData.checkOut?.toISOString() || '',
        guests: searchData.guests
      });
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-field">
        <label>Location</label>
        <input
          type="text"
          placeholder="Where are you going?"
          value={searchData.city}
          onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
        />
      </div>

      <div className="search-field">
        <label>Check-in</label>
        <DatePicker
          selected={searchData.checkIn}
          onChange={(date) => setSearchData({ ...searchData, checkIn: date })}
          minDate={new Date()}
          dateFormat="dd MMM"
          placeholderText="Add date"
        />
      </div>

      <div className="search-field">
        <label>Check-out</label>
        <DatePicker
          selected={searchData.checkOut}
          onChange={(date) => setSearchData({ ...searchData, checkOut: date })}
          minDate={searchData.checkIn || new Date()}
          dateFormat="dd MMM"
          placeholderText="Add date"
        />
      </div>

      <div className="search-field">
        <label>Guests</label>
        <input
          type="number"
          min="1"
          max="20"
          value={searchData.guests}
          onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary search-btn">
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
