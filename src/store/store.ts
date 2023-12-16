import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'
import positionReducer from './position/PositionSlice'
import formPointSelectionReducer from './form-point-selection/FormPointSelectionSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    position: positionReducer,
    formPointSelection: formPointSelectionReducer, 
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;