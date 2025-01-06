import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setDate } from './stocksSlice';
import {
  fetchChartCandles,
  setSelectedStock,
  setFilteredStocks,
} from './historicalDataSlice';
import { setSelectedChart } from './stocksSlice';
import { filterScannerResults } from '../utils';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setDate,

  effect: async (action, { dispatch, getState }) => {
    const { payload: date } = action;
    const { payload } = await dispatch(fetchChartCandles(date));
    if (payload?.error) {
      console.error('Error fetching chart candles:', payload.error);
    } else {
      const selectedStock = payload?.selectedStock || payload?.stocks[0];
      const scannerConfig = getState().scanner.config;
      dispatch(setSelectedStock(selectedStock));
      dispatch(setSelectedChart({ stock: selectedStock, date }));
      dispatch(
        setFilteredStocks(
          payload?.stocks.filter(filterScannerResults(scannerConfig))
        )
      );
    }
  },
});

export default listenerMiddleware;
