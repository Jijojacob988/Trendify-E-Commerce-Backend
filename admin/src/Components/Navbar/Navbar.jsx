import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.jpg';
import navProfile from '../../assets/nav-profile.jpg';

const Navbar = () => {
  console.log('Navbar Component Rendered');
  console.log('navlogo:', navlogo); // Log the imported paths
  console.log('navProfile:', navProfile); // Log the imported paths

  return (
    <div className='navbar'>
      <img src={navlogo} alt="Nav Logo" className="nav-logo" />
      <img src={navProfile} className='nav-profile' alt="Nav Profile" />
    </div>
  );
}

export default Navbar;
