import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/login/LoginSlice';

const LogOutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    // Clear session storage
    sessionStorage.clear();

    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      {/* You can customize the icon here, for example, using an "x" inside a circle */}
      &#x2715;
    </button>
  );
};

export default LogOutButton;
