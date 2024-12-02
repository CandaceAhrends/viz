import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RELATED_CO_URI } from '../consts';

interface Related {
  ticker: string;
}

export const relatedApiSlice = createApi({
  reducerPath: 'relatedApi',
  baseQuery: fetchBaseQuery({ baseUrl: RELATED_CO_URI }),
  endpoints: (builder) => ({
    getRelated: builder.query<Related[], void>({
      query: (symbol) => {
        return `/${symbol}`;
      },
    }),
  }),
});

export const { useGetRelatedQuery } = relatedApiSlice;
export default relatedApiSlice.reducer;
