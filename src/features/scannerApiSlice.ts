import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POLY_SERVICES_URI } from '../consts';

interface ScanResponse {
  stocks: object[];
}

export const scannerApiSlice = createApi({
  reducerPath: 'scrollStocksApi',
  baseQuery: fetchBaseQuery({ baseUrl: POLY_SERVICES_URI }),
  endpoints: (builder) => ({
    listScanStocks: builder.query<
      ScanResponse[],
      { date: string; page: string }
    >({
      query: (arg) => {
        const { date, page } = arg;
        return `/topVolume/${date}/${page}`;
      },
    }),
  }),
});

export const { useListScanStocksQuery } = scannerApiSlice;
export default scannerApiSlice.reducer;
