import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScannerState {
  isScannerOpen: boolean;
}

const initialState: ScannerState = {
  isScannerOpen: false,
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.isScannerOpen = action.payload;
    },
  },
});

export const { setOpen } = scannerSlice.actions;

export default scannerSlice.reducer;
