import { configureStore } from '@reduxjs/toolkit';
import stocksSlice from './features/stocksSlice';
import { stocksApiSlice } from './features/stocksSlice';
import { chartSlice } from './features/chartSlice';
import scannerSlice from './features/scannerSlice';
import navigationSlice from './features/navigationSlice';
import { relatedApiSlice } from './features/relatedCompaniesSlice';
import { scannerApiSlice } from './features/scannerApiSlice';
import historicalDataSlice from './features/historicalDataSlice';
import listenerMiddleware from './features/listenerMiddleware';

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      stocks: stocksSlice,
      scanner: scannerSlice,
      historicalData: historicalDataSlice,
      navigation: navigationSlice,
      [stocksApiSlice.reducerPath]: stocksApiSlice.reducer,
      [relatedApiSlice.reducerPath]: relatedApiSlice.reducer,
      [chartSlice.reducerPath]: chartSlice.reducer,
      [scannerApiSlice.reducerPath]: scannerApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        listenerMiddleware.middleware,
        stocksApiSlice.middleware,
        relatedApiSlice.middleware,
        chartSlice.middleware,
        scannerApiSlice.middleware
      );
    },
    preloadedState,
  });
};
export const store = setupStore({});
// export const store = configureStore({
//   reducer: {
//     stocks: stocksSlice,
//     scanner: scannerSlice,
//     historicalData: historicalDataSlice,
//     navigation: navigationSlice,
//     [stocksApiSlice.reducerPath]: stocksApiSlice.reducer,
//     [relatedApiSlice.reducerPath]: relatedApiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(
//       listenerMiddleware.middleware,
//       stocksApiSlice.middleware,
//       relatedApiSlice.middleware
//     );
//   },
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
