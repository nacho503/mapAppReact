import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/LoginSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;