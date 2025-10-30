import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HomelyHub</h3>
          <p>Your trusted platform for finding perfect accommodations worldwide.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Hosts</h4>
          <ul>
            <li><Link to="/add-property">List Your Property</Link></li>
            <li><Link to="/host-guide">Host Guide</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cancellation">Cancellation Policy</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HomelyHub. All rights reserved.</p>
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
};

export default Footer;
