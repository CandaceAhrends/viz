import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STOCK_SCANNER_URI } from '../consts';

interface Stock {
  symbol: string;
  volume: number;
}

interface StockState {
  stocks: Stock[];
  date: string;
  reloadCharts: boolean;
}

const initialState: StockState = {
  stocks: [],
  date: '',
  reloadCharts: true,
};

export const stocksApiSlice = createApi({
  reducerPath: 'stocksApi',
  baseQuery: fetchBaseQuery({ baseUrl: STOCK_SCANNER_URI }),
  endpoints: (builder) => ({
    getStocks: builder.query<Stock[], void>({
      query: () => {
        return `/topvolume`;
      },
    }),
  }),
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setChartStocks(state, action: PayloadAction<Stock[]>) {
      state.stocks = [...action.payload];
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.reloadCharts = true;
    },
    setChartsLoaded(state) {
      state.reloadCharts = false;
    },
  },
});

export const { useGetStocksQuery } = stocksApiSlice;
export const { setChartStocks, setDate, setChartsLoaded } = stocksSlice.actions;
export default stocksSlice.reducer;
