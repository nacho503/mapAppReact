import React, { useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import {setSelectingPoint} from '../../store/form-point-selection/FormPointSelectionSlice';
import { RootState } from '../../store/store';

const ChooseLocationButton: React.FC = () => {
  const selectedPoint = useSelector((state: RootState) => state.formPointSelection.selectedPoint);
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
        {selectedPoint.lat !== null && selectedPoint.lng !== null ? (
        <div>
          <p>Selected Location:</p>
          <p>Latitude: {selectedPoint.lat}</p>
          <p>Longitude: {selectedPoint.lng}</p>
        </div>
      ) : (
        <button onClick={handleButtonClick}>Choose location on the map</button>
      )}
    </div>
  );
};

export default ChooseLocationButton;