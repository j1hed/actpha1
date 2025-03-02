import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-widget">
              <h3>About ACT Pharma</h3>
              <p>
                ACT Pharma is a leading pharmaceutical company in Tunisia, 
                committed to providing high-quality healthcare solutions 
                through innovative pharmaceutical products.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-widget">
              <h3>Contact Info</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  IZ 9013 Oued Zarga, Beja Tunisia
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  +216 78 590 060
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  contact@actpharma-sa.com
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-widget">
              <h3>Quick Links</h3>
              <ul className="quick-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Our Products</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; {new Date().getFullYear()} ACT Pharma. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;