import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {setSelectingPoint} from '../../store/form-point-selection/FormPointSelectionSlice';
import { RootState } from '../../store/store';
import PinMapButton from '../navbar/create-pin/PinMapButton';

const AcceptSelectedLocation: React.FC = () => {
  const selectedPoint = useSelector((state: RootState) => state.formPointSelection.selectedPoint);
  const dispatch = useDispatch();


  return selectedPoint.lat && selectedPoint.lng !== null  ? (
    <div>
      Your selected spot is at latitude: {selectedPoint.lat} and longitude: {selectedPoint.lng}.<PinMapButton buttonText='Accept'/>
      
    </div>
  ) : null;
};

export default AcceptSelectedLocation;