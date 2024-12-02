import { configureStore } from '@reduxjs/toolkit';
import stocksSlice from './features/stocksSlice';
import { stocksApiSlice } from './features/stocksSlice';
import { earningsApiSlice } from './features/earningsSlice';
import { chartApiSlice } from './features/chartsSlice';
import scannerSlice from './features/scannerSlice';
import { relatedApiSlice } from './features/relatedCompaniesSlice';

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
    scanner: scannerSlice,
    [stocksApiSlice.reducerPath]: stocksApiSlice.reducer,
    [earningsApiSlice.reducerPath]: earningsApiSlice.reducer,
    [chartApiSlice.reducerPath]: chartApiSlice.reducer,
    [relatedApiSlice.reducerPath]: relatedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      stocksApiSlice.middleware,
      earningsApiSlice.middleware,
      chartApiSlice.middleware,
      relatedApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
