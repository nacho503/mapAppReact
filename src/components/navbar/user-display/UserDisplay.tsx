import React from 'react';
import { useSelector } from 'react-redux';
import {RootState} from '../../../store/store'
import LogoutButton from '../login-button/logout-button/LogOutButton';


const UserDisplay: React.FC = () => {
  const user = useSelector((state:RootState ) => state.login.user);
  console.log('UserDisplay - user:', user); // Add this line for debugging

  return (
    
    <div>
      {user ? (
        <>
        <p>Hi, {user.email}!</p>
         <LogoutButton/>
         </>
      ) : (
        <p>Please log in to see your email.</p>
      )}
    </div>
  );
  
};

export default UserDisplay;
