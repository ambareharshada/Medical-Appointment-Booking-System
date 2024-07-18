import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from './components/Navbar';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegistration from './components/DoctorRegistration';
import PatientRegistration from './components/patientRegistration';
import PatientLogin from './components/PatientLogin';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import LeftNavigation from './components/LeftNavigation';
import Home from './components/Home';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNavVisible, setNavVisible] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    localStorage.clear();
  };

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <div className="App">
      <LeftNavigation isVisible={isNavVisible} toggleNav={toggleNav} />
      <header>
        <button className="menu-toggle" onClick={toggleNav}>☰ </button>
        <NavbarComponent user={user} onLogout={handleLogout} />
      </header>
      <div id="main">
        <article>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor-login" element={user ? <Link to="/" /> : <DoctorLogin setUser={setUser} />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/patient-login" element={user ? <Link to="/" /> : <PatientLogin setUser={setUser} />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Routes>
        </article>
      </div>
    </div>
  );
}

export default App;
