import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchHistoricalData } from '../services';
import { getNextSymbol, getPrevSymbol } from '../utils';

export const fetchData = createAsyncThunk(
  'chartSync/fetchData',
  async (date: string) => {
    const { stocks, market, error } = await fetchHistoricalData(date);
    return { market, stocks, charts: [], error };
  }
);

interface HistoricalDataState {
  topVolume: any;
  filteredStocks: any;
  selectedStock: string;
  marketSummary: object[];
  hasError: boolean;
}

const initialState: HistoricalDataState = {
  topVolume: [],
  filteredStocks: [],
  selectedStock: '',
  marketSummary: [],
  hasError: false,
};

const historicalDataSlice = createSlice({
  name: 'historicalData',
  initialState,
  reducers: {
    setSelectedStock(state, action: PayloadAction<string>) {
      state.selectedStock = action.payload;
    },
    setFilteredStocks(state, action: PayloadAction<any>) {
      state.filteredStocks = action.payload;
    },
    selectNextSymbol(state) {
      state.selectedStock = getNextSymbol(state);
    },
    selectPrevSymbol(state) {
      state.selectedStock = getPrevSymbol(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.topVolume = action.payload?.stocks;
      state.filteredStocks = action.payload?.stocks;
      state.marketSummary = action.payload?.market;
      state.hasError = action.payload?.error;
    });
  },
});

export const {
  setSelectedStock,
  setFilteredStocks,
  selectNextSymbol,
  selectPrevSymbol,
} = historicalDataSlice.actions;
export default historicalDataSlice.reducer;
