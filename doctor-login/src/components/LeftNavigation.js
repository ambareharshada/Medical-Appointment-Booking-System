import React from 'react';
import { Link } from 'react-router-dom';
// import './LeftNavigation.css';

const LeftNavigation = ({ isVisible, toggleNav }) => {
  return (
    <div className={`left-nav ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={toggleNav}>✕</button>
      <nav>
        <ul>
          <li><Link to="/" onClick={toggleNav}>Home</Link></li>
          <li><Link to="/doctor-login" onClick={toggleNav}>Doctor Login</Link></li>
          <li><Link to="/doctor-registration" onClick={toggleNav}>Doctor Registration</Link></li>
          <li><Link to="/patient-login" onClick={toggleNav}>Patient Login</Link></li>
          <li><Link to="/patient-registration" onClick={toggleNav}>Patient Registration</Link></li>
          <li><Link to="/patient-dashboard" onClick={toggleNav}>Patient Dashboard</Link></li>
          <li><Link to="/doctor-dashboard" onClick={toggleNav}>Doctor Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftNavigation;
