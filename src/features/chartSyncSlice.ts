import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStockData } from '../services';
import { getDateForChart } from '../utils';
import dayjs from 'dayjs';

export const fetchChartCandles = createAsyncThunk(
  'chartSync/fetchChartCandles',
  async (stocks: string[]) => {
    // const candlePromises = stocks.map((stock) => fetchStockData(stock));
    // const responses = await Promise.all(candlePromises);
    // const response = responses.reduce((acc, res, index) => {
    //   const chartCandles = res.slice(0, 1).map((d) => {
    //     const time = dayjs(d.t).format('HH:mm');
    //     const currentChartDate = getDateForChart(time);
    //     const { o, h, l, c } = d;
    //     return {
    //       x: currentChartDate,
    //       y: [o, h, l, c],
    //     };
    //   });
    //   acc[stocks[index]] = [...chartCandles];
    //   return acc;
    // }, {});
    return JSON.stringify(stocks);
  }
);

type ChartSyncState = {
  stockDataMap: string;
};

const initialState: ChartSyncState = {
  stockDataMap: '',
};

const chartSyncSlice = createSlice({
  name: 'chartSync',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartCandles.fulfilled, (state, action) => {
      if (state.stockDataMap !== action.payload) {
        console.log('update stockDataMap');
        state.stockDataMap = action.payload;
      }
    });
  },
});

export default chartSyncSlice.reducer;
