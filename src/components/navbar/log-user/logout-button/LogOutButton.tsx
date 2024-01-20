import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/login/LoginSlice';
import closeIcon from '../../../../assets/icons/close-icon.svg'

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
       <img src={closeIcon} alt="Close" />
    </button>
  );
};

export default LogOutButton;
