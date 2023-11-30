// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoginButton from './login-button/LoginButton';
import UserDisplay from './user-display/UserDisplay';
import './Navbar.scss';

import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from '../../utils/GoogleAuth';

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
           <GoogleOAuthProvider clientId="743392961384-04cv11v4msdvhptq78n7bsid5a4jlqu6.apps.googleusercontent.com">
             <GoogleAuth />
          </GoogleOAuthProvider>
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
