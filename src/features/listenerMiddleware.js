import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setDate } from './stocksSlice';
import { fetchChartCandles, setSelectedStock } from './historicalDataSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setDate,

  effect: async (action, { dispatch }) => {
    const { payload: date } = action;
    const { payload } = await dispatch(fetchChartCandles(date));
    if (payload?.error) {
      console.error('Error fetching chart candles:', payload.error);
    } else {
      const selectedStock = payload?.stocks[0];
      dispatch(setSelectedStock(selectedStock));
    }
  },
});

export default listenerMiddleware;
