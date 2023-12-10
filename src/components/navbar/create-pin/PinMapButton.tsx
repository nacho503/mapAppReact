import React, { useState } from 'react';
import MapForm from '../../events/MapForm';
import '../Navbar.scss'

const PinMapButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="pin-map-button">
        Pin Map
      </button>
      {showForm && <MapForm />}
    </div>
  );
};

export default PinMapButton;