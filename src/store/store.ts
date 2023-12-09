import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'
import positionReducer from './position/PositionSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    position: positionReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;