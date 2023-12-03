import { useState,useEffect } from 'react';  
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { loginSuccess,loginFailure } from '../store/login/LoginSlice';
import { jwtDecode } from 'jwt-decode';

import { useDispatch } from 'react-redux';

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


const GoogleAuth = () => {
  const [response, setResponse] = useState<CredentialResponse | undefined>(undefined);
  const [email,setEmail] = useState('');
  const dispatch = useDispatch();

  // Using 'credential' property to access the JWT
  const token = response?.credential;
  const decodedResp = token ? jwtDecode<JwtPayload>(token) : null;
 
  useEffect(() => {
    // Access the decoded data as needed
    console.log(decodedResp);
    if (decodedResp && decodedResp.email) {
      setEmail(decodedResp.email);
      dispatch(loginSuccess({ email: decodedResp.email }));
      if (token) {
        try {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('isGoogleAuth', 'true');
        } catch (error) {
          console.error('Error setting token in sessionStorage:', error);
        }
      }
    }
  }, [decodedResp, token]);

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        setResponse(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleAuth;
