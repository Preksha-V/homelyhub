import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../../store/userSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          🏠 HomelyHub
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/mybookings">My Bookings</Link></li>
              <li><Link to="/add-property">Add Property</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li>
                <Link to="/register">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
