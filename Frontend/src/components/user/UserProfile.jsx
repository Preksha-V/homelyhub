import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../home/Navbar';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

   useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!currentUser) return null;

  return (
    <div>
      <Navbar />
      <div className="container profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {currentUser.avatar?.url ? (
                <img src={currentUser.avatar.url} alt={currentUser.name} />
              ) : (
                <div className="avatar-placeholder">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2>{currentUser.name}</h2>
            <p className="profile-email">{currentUser.email}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Phone Number:</span>
              <span className="detail-value">{currentUser.phoneNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">
                {new Date(currentUser.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-secondary">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

