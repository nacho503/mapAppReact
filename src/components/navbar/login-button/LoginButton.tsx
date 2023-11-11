import React, { useState } from 'react';
import '../Navbar.scss' // Import your styles

const LoginButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <form>
              <label>Email:</label>
              <input type="email" name="email" />

              <label>Password:</label>
              <input type="password" name="password" />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;