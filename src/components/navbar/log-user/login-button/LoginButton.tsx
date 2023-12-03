import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../../store/login/LoginSlice';
import LoginModal from '../login-modal/LoginModal'; // Import the new component
import '../../Navbar.scss'; // Import your styles

const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Assuming your API endpoint returns a JSON object with a 'token' field upon successful login
      const response = await fetch('https://nodemysqlrailwaytest-production.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('isGoogleAuth', 'false');
        dispatch(loginSuccess({ email: email }));
        handleCloseModal();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>

      {isModalOpen && (
        <LoginModal
          email={email}
          password={password}
          error={error}
          isLoading={isLoading}
          setEmail={setEmail}
          setPassword={setPassword}
          handleCloseModal={handleCloseModal}
          handleLoginSubmit={handleLoginSubmit}
        />
      )}
    </>
  );
};

export default LoginButton;