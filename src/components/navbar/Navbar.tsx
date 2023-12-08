// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoginButton from './log-user/login-button/LoginButton';
import UserDisplay from './user-display/UserDisplay';
import './Navbar.scss';


const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>
        <div className="menu-icon">
          {/* You can add a menu icon for mobile responsiveness */}
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            {isLoggedIn ? <UserDisplay /> : <LoginButton />}
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">
              About
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
