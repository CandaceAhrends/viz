import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStockData } from '../services';
import dayjs from 'dayjs';

export const fetchChartCandles = createAsyncThunk(
  'chartSync/fetchChartCandles',
  async (stocks: string[]) => {
    const candlePromises = stocks.map((stock) => fetchStockData(stock));
    const responses = await Promise.all(candlePromises);
    const response = responses.reduce((acc, res, index) => {
      const chartCandles = res
        .map((d) => {
          const { t, o, h, l, c } = d;
          return {
            x: dayjs(t),
            y: [o, h, l, c],
          };
        })
        .slice(-5);
      const [lastCandle] = chartCandles.slice(-1);
      const dt = lastCandle.x;
      let currentCandleTime = dayjs(dt);
      const currentCandleTimeMinAdd = currentCandleTime.add(1, 'minute');
      const appendCandle = {
        x: currentCandleTimeMinAdd,
        y: lastCandle.y,
      };
      acc[stocks[index]] = [...chartCandles, appendCandle];

      return acc;
    }, {});
    return response;
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
        state.stockDataMap = JSON.stringify(action.payload);
      }
    });
  },
});

export default chartSyncSlice.reducer;
