import React from 'react';
import { Link } from 'react-router-dom';
// import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/photo">Take Photo</Link></li>
        {/* <li><Link to="/chat">Chat</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;