import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Config {
  minPrice: number;
  maxPrice: number;
  minChange: number;
  maxChange: number;
}

interface ScannerState {
  isScannerOpen: boolean;
  config: Config;
  topVolume: string[];
  topGainers: string[];
}

const initialState: ScannerState = {
  isScannerOpen: false,
  config: { minPrice: 0, maxPrice: 3000, minChange: -1000, maxChange: 1000 },
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
    setConfig(state, action: PayloadAction<Config>) {
      state.config = action.payload;
    },
  },
});

export const { setOpen, setConfig, setTopVolume, setTopGainers } =
  scannerSlice.actions;

export default scannerSlice.reducer;
