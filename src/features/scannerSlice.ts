import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScannerState {
  isScannerOpen: boolean;
  topVolume: string[];
  topGainers: string[];
}

const initialState: ScannerState = {
  isScannerOpen: false,
  topVolume: [],
  topGainers: [],
};

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.isScannerOpen = action.payload;
    },
    setTopVolume(state, action: PayloadAction<string[]>) {
      state.topVolume = [...action.payload];
    },
    setTopGainers(state, action: PayloadAction<string[]>) {
      state.topGainers = [...action.payload];
    },
  },
});

export const { setOpen, setTopVolume, setTopGainers } = scannerSlice.actions;

export default scannerSlice.reducer;
