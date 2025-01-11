import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STOCK_SCANNER_URI } from '../consts';

interface SelectedChartStock {
  stock: object;
  date: string;
}
interface Stock {
  symbol: string;
  volume: string;
}
interface StockState {
  date: string;
  animate: boolean;
  selectedChart: SelectedChartStock;
}

const initialState: StockState = {
  date: '',
  animate: false,
  selectedChart: {
    stock: {},
    date: '',
  },
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
    setSelectedChart(state, action: PayloadAction<SelectedChartStock>) {
      state.selectedChart = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.animate = true;
    },
    resetAnimate(state) {
      state.animate = false;
    },
  },
});

export const { useGetStocksQuery } = stocksApiSlice;
export const { setSelectedChart, setDate, resetAnimate } = stocksSlice.actions;
export default stocksSlice.reducer;
