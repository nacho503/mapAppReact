import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormPointSelectionState {
  isSelectingPoint: boolean;
  selectedPoint: {
    lat: number | null;
    lng: number | null;
  };
}

const initialState: FormPointSelectionState = {
  isSelectingPoint: false,
  selectedPoint: {
    lat: null,
    lng: null,
  },
};

export const formPointSelectionSlice = createSlice({
  name: 'formPointSelection',
  initialState,
  reducers: {
    setSelectingPoint: (state, action: PayloadAction<boolean>) => {
      state.isSelectingPoint = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.selectedPoint = action.payload;
    },
  },
});

export const { setSelectingPoint,setSelectedPoint } = formPointSelectionSlice.actions;

export default formPointSelectionSlice.reducer;