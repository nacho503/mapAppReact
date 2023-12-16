import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormPointSelectionState {
  isSelectingPoint: boolean;
}

const initialState: FormPointSelectionState = {
  isSelectingPoint: false,
};

export const formPointSelectionSlice = createSlice({
  name: 'formPointSelection',
  initialState,
  reducers: {
    setSelectingPoint: (state, action: PayloadAction<boolean>) => {
      state.isSelectingPoint = action.payload;
    },
  },
});

export const { setSelectingPoint } = formPointSelectionSlice.actions;

export default formPointSelectionSlice.reducer;