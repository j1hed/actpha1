import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Link to="/" className="logo">
              <img 
                src="/assets/logo-act-pharma.png" 
                alt="ACT Pharma" 
                className="logo-default"
              />
            </Link>
          </div>
          <div className="col-md-9">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;