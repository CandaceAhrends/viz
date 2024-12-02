import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POLY_SERVICES_URI } from '../consts';

interface Related {
  ticker: string;
}

export const relatedApiSlice = createApi({
  reducerPath: 'relatedApi',
  baseQuery: fetchBaseQuery({ baseUrl: POLY_SERVICES_URI }),
  endpoints: (builder) => ({
    getRelated: builder.query<Related[], void>({
      query: (symbol) => {
        return `/related/${symbol}`;
      },
    }),
  }),
});

export const { useGetRelatedQuery } = relatedApiSlice;
export default relatedApiSlice.reducer;
