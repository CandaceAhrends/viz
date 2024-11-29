import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScannerState {
  bullish: boolean;
}

const initialState: ScannerState = {
  bullish: false,
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    setBullish(state, action: PayloadAction<boolean>) {
      state.bullish = action.payload; // This is the action.payload that is passed to the reducer
    },
  },
});

export const { setBullish } = scannerSlice.actions;

export default scannerSlice.reducer;
