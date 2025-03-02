import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="container">
          <Link to="/" className="logo-link">
            <img 
              src="/assets/logo-act-pharma.png" 
              alt="ACT Pharma" 
              className="header-logo"
            />
          </Link>
        </div>
      </div>
      
      <nav className="main-nav">
        <div className="container">
          <div className="navbar-header">
            <button 
              type="button" 
              className={`navbar-toggle nav-trigger style-mobile ${isOpen ? 'collapsed' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="bars">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </span>
            </button>
          </div>
          
          <div className={`navbar-collapse primary-font ${isOpen ? 'show' : ''}`}>
            <ul className="main-nav nav align-items-lg-stretch justify-content-lg-center">
              <li className="menu-item">
                <Link to="/">
                  <span className="link-icon"></span>
                  <span className="link-txt">
                    <span className="link-ext"></span>
                    <span className="txt">
                      Home
                      <span className="submenu-expander">
                        <i className="fa fa-angle-down"></i>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/about">
                  <span className="link-icon"></span>
                  <span className="link-txt">
                    <span className="link-ext"></span>
                    <span className="txt">
                      About us
                      <span className="submenu-expander">
                        <i className="fa fa-angle-down"></i>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/products">
                  <span className="link-icon"></span>
                  <span className="link-txt">
                    <span className="link-ext"></span>
                    <span className="txt">
                      Our Products
                      <span className="submenu-expander">
                        <i className="fa fa-angle-down"></i>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">
                  <span className="link-icon"></span>
                  <span className="link-txt">
                    <span className="link-ext"></span>
                    <span className="txt">
                      Contact us
                      <span className="submenu-expander">
                        <i className="fa fa-angle-down"></i>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
              {/* Login and Signup Buttons */}
              <li className="menu-item">
                <Link to="/login" className="nav-button">
                  <span className="link-txt">
                    Login
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/signup" className="nav-button">
                  <span className="link-txt">
                    Signup
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;