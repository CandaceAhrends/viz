import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchHistoricalData, fetchStockCandles } from '../services';

export const fetchChartCandles = createAsyncThunk(
  'chartSync/fetchChartCandles',
  async (date: string) => {
    const { stocks, market, error } = await fetchHistoricalData(date);

    let charts = new Map();
    for (const stock of market.slice(0, 20)) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const { symbol } = stock;
      const chartCandles = await fetchStockCandles({ symbol, date });
      charts.set(symbol, chartCandles);
    }
    return { market, stocks, charts: JSON.stringify([...charts]), error };
  }
);

type HistoricalDataState = {
  topVolume: any;
  filteredStocks: any;
  historicalCharts: string;
  selectedStock: string;
  marketSummary: object[];
  hasError: boolean;
};

const initialState: HistoricalDataState = {
  topVolume: [],
  filteredStocks: [],
  historicalCharts: '',
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChartCandles.fulfilled, (state, action) => {
      state.topVolume = action.payload?.stocks;
      state.filteredStocks = action.payload?.stocks;
      state.marketSummary = action.payload?.market;
      state.historicalCharts = action.payload?.charts;
      state.hasError = action.payload?.error;
    });
  },
});

export const { setSelectedStock, setFilteredStocks } =
  historicalDataSlice.actions;
export default historicalDataSlice.reducer;
