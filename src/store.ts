import { configureStore } from '@reduxjs/toolkit';
import stocksSlice from './features/stocksSlice';
import { stocksApiSlice } from './features/stocksSlice';
import scannerSlice from './features/scannerSlice';
import navigationSlice from './features/navigationSlice';
import { relatedApiSlice } from './features/relatedCompaniesSlice';
import chartSyncSlice from './features/chartSyncSlice';
import listenerMiddleware from './features/listenerMiddleware';

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
    scanner: scannerSlice,
    chartSync: chartSyncSlice,
    navigation: navigationSlice,
    [stocksApiSlice.reducerPath]: stocksApiSlice.reducer,
    [relatedApiSlice.reducerPath]: relatedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      listenerMiddleware.middleware,
      stocksApiSlice.middleware,
      relatedApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
