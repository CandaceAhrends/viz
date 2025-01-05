import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const MIN = 10;
const MAX = 3000;

interface ScannerState {
  isScannerOpen: boolean;
  config: object;
  topVolume: string[];
  topGainers: string[];
}

const initialState: ScannerState = {
  isScannerOpen: false,
  config: { min: MIN, max: MAX },
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
    setConfig(state, action: PayloadAction<object>) {
      state.config = action.payload;
    },
  },
});

export const { setOpen, setConfig, setTopVolume, setTopGainers } =
  scannerSlice.actions;

export default scannerSlice.reducer;
