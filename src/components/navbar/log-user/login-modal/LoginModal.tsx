import React from 'react';
import GoogleAuth from '../../../../utils/GoogleAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface LoginModalProps {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleCloseModal: () => void;
  handleLoginSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  email,
  password,
  error,
  isLoading,
  setEmail,
  setPassword,
  handleCloseModal,
  handleLoginSubmit,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>Login</h2>
      <div className='modal-content-user-container'>
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
         
          
          
        </form> 
        </div>
        <div className='modal-google-container'>
        <GoogleOAuthProvider clientId="743392961384-04cv11v4msdvhptq78n7bsid5a4jlqu6.apps.googleusercontent.com">
            <GoogleAuth/>
        </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
