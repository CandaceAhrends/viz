import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchHistoricalData, fetchStockCandles } from '../services';
import { getDateForChart } from '../utils';
import dayjs from 'dayjs';

export const fetchChartCandles = createAsyncThunk(
  'chartSync/fetchChartCandles',
  async (date: string) => {
    const { stocks, market, error } = await fetchHistoricalData(date);

    let charts = new Map();
    for (const stock of stocks.slice(0, 20)) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const { symbol } = stock;
      const response = await fetchStockCandles({ symbol, date });
      const chartCandles = response.map((d) => {
        const time = dayjs(d.t).format('HH:mm');
        const currentChartDate = getDateForChart(time);
        const { o, h, l, c } = d;
        return {
          x: currentChartDate,
          y: [o, h, l, c],
        };
      });
      charts.set(symbol, chartCandles);
    }
    return { market, stocks, charts: JSON.stringify([...charts]), error };
  }
);

type HistoricalDataState = {
  topVolume: any;
  filteredStocks: any;
  historicalCharts: object[];
  selectedStock: string;
  marketSummary: object[];
  hasError: boolean;
};

const initialState: HistoricalDataState = {
  topVolume: [],
  filteredStocks: [],
  historicalCharts: [],
  selectedStock: '',
  marketSummary: [],
  hasError: false,
};

const historicalDataSlice = createSlice({
  name: 'chartSync',
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
      console.log('update historicalData');

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
