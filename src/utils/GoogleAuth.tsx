import { useState } from 'react';  
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleAuth = () => {
  const [response, setResponse] = useState<CredentialResponse | undefined>(undefined);

  // Using 'credential' property to access the JWT
  const token = response?.credential;
  const decodedResp = token ? jwtDecode(token) : null;

  // Access the decoded data as needed
  console.log(decodedResp);

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
