import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {setSelectingPoint} from '../../store/form-point-selection/FormPointSelectionSlice'

const ChooseLocationButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setSelectingPoint(true));
      const closeButton = document.querySelector('.close-map-form') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }

  };

  return ( 
    <div>
      <button onClick={handleButtonClick}>Choose location on the map</button>
    </div>
  );
};

export default ChooseLocationButton;