import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import LogoutButton from '../log-user/logout-button/LogOutButton';
import '../../navbar/Navbar.scss';

const UserDisplay: React.FC = () => {
  const user = useSelector((state: RootState) => state.login.user);

  return (
    <div className='user-name-container'>
      {user ? (
        <>
          <p>Hi, {user.email}!</p>
          <LogoutButton />
        </>
      ) : (
        <p>Please log in to see your email.</p>
      )}
    </div>
  );
};

export default UserDisplay;
