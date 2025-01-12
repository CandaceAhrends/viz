import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setDate, resetAnimate, setSelectedChart } from './stocksSlice';
import { selectNextSymbol, selectPrevSymbol } from './historicalDataSlice';
import {
  fetchChartCandles,
  setSelectedStock,
  setFilteredStocks,
} from './historicalDataSlice';

import { filterScannerResults } from '../utils';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setDate, selectNextSymbol, selectPrevSymbol),

  effect: async (action, { dispatch, getState }) => {
    const { payload: date } = action;
    if (selectNextSymbol.match(action) || selectPrevSymbol.match(action)) {
      const selectedStock = getState().historicalData.selectedStock;
      const selectedDate = getState().stocks.date;
      dispatch(setSelectedChart({ stock: selectedStock, datea: selectedDate }));
    } else {
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
      dispatch(resetAnimate());
    }
  },
});

export default listenerMiddleware;
