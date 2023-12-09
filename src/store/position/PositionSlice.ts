import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PositionState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const initialState: PositionState = {
  latitude: null,
  longitude: null,
  error: null,
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.latitude = null;
      state.longitude = null;
      state.error = action.payload;
    },
  },
});

export const { setPosition, setError } = positionSlice.actions;

export default positionSlice.reducer;