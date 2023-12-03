import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginSuccess, logout } from '../store/login/LoginSlice';

import { jwtDecode } from 'jwt-decode';

interface UserAuthenticationWrapperProps {
  children: React.ReactNode;
}

interface JwtPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  jti: string;
}

const UserAuthenticationWrapper: React.FC<UserAuthenticationWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const storedIsGoogleAuth = sessionStorage.getItem('isGoogleAuth') === 'true'; 

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token && !isLoggedIn) {
      if (storedIsGoogleAuth) {
        const decodeGoogleToken = jwtDecode<JwtPayload>(token);
        dispatch(loginSuccess({ email: decodeGoogleToken.email }));        
      }else if(!storedIsGoogleAuth){
        fetchUserData(token);
      }     
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
