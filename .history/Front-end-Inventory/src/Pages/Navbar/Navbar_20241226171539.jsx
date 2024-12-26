import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MiApp</Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Inicio</Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">Acerca de</Link>
          </li>
          <li>
            <Link to="/createitem" className="navbar-link">Createitem</Link>
          </li>
          <li>
            <Link to="/EditItem" className="navbar-link">EditItem</Link>
          </li>
          <li>
            <Link to="/signin" className="navbar-link">Sign In</Link>
          </li>
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;