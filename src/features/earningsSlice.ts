import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EARNINGS_URI } from '../consts';

interface Earnings {
  symbol: string;
  name: string;
  reportDate: string;
  fiscalDateEnding: string;
  estimate: number;
  currency: string;
}

export const earningsApiSlice = createApi({
  reducerPath: 'earningsApi',
  baseQuery: fetchBaseQuery({ baseUrl: EARNINGS_URI }),
  endpoints: (builder) => ({
    getEarnings: builder.query<Earnings[], void>({
      query: () => {
        return `/`;
      },
    }),
  }),
});

export const { useGetEarningsQuery } = earningsApiSlice;
export default earningsApiSlice.reducer;
