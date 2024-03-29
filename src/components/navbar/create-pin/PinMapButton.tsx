import React, { useState } from 'react';
import MapForm from '../../pin-map-form/MapForm';
import '../Navbar.scss'
import closeIcon from '../../../assets/icons/close-icon.svg'

interface PinMapButtonProps {
  buttonText: string;
}

const PinMapButton: React.FC<PinMapButtonProps> = ({ buttonText }) => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="pin-map-button">
        {buttonText}
      </button>
      {showForm && (
        <div className="modal-overlay-map-form">
          <div className="map-form-container">
            <button className="close-map-form" onClick={handleButtonClick}>
            <img src={closeIcon} alt="Close" />
            </button>
           <MapForm/>
           </div>     
      </div>
      )}
    </div>
  );
};

export default PinMapButton;