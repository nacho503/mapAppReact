import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: boolean;
  user: {
    email: string;
    // Add other user properties as needed
  } | null;
  error: string | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.isLoggedIn = true;
      state.user = { email: action.payload.email };
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
