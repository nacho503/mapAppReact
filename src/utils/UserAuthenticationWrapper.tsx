import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginSuccess, logout } from '../store/login/LoginSlice';

interface UserAuthenticationWrapperProps {
  children: React.ReactNode;
}

const UserAuthenticationWrapper: React.FC<UserAuthenticationWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token && !isLoggedIn) {
      fetchUserData(token);
    }
  }, [isLoggedIn]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('https://nodemysqlrailwaytest-production.up.railway.app/user-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(loginSuccess({ email: userData.email }));
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
      dispatch(logout());
    }
  };

  return <>{children}</>;
};

export default UserAuthenticationWrapper;
