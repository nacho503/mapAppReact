import React, { useState, FormEvent  } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../store/login/LoginSlice';
import '../Navbar.scss' // Import your styles

const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

        
        dispatch(loginSuccess({ email: email }));
        handleCloseModal();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <>
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Login</h2>
            {/* Add your login form here */}
            <form onSubmit={handleLoginSubmit}>
              <label>Email:</label>
              <input   type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <label>Password:</label>
              <input   type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;