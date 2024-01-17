import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {setSelectingPoint} from '../../store/form-point-selection/FormPointSelectionSlice';
import { RootState } from '../../store/store';

const AcceptSelectedLocation: React.FC = () => {
  const selectedPoint = useSelector((state: RootState) => state.formPointSelection.selectedPoint);
  const dispatch = useDispatch();


  return selectedPoint.lat && selectedPoint.lng !== null  ? (
    <div>
      Hey You!
    </div>
  ) : null;
};

export default AcceptSelectedLocation;