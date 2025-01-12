import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POLY_SERVICES_URI } from '../consts';

interface Chart {
  h: number;
  l: number;
  o: number;
  c: number;
  [key: number]: any;
}
interface Ressponse {
  results: any[];
}

interface ChartRequest {
  symbol: string;
  date: string;
  timeFrame: string;
}
export const chartSlice = createApi({
  reducerPath: 'chartApi',
  baseQuery: fetchBaseQuery({ baseUrl: POLY_SERVICES_URI }),
  endpoints: (builder) => ({
    getChart: builder.query<Chart[], ChartRequest>({
      query: ({ symbol, date, timeFrame }) => {
        return `/agg/${symbol}/${date}/${timeFrame}`;
      },
      transformResponse: (response: Ressponse) => {
        const chartData: Chart[] = <Chart[]>response?.results || [];
        return chartData;
      },
    }),
  }),
});

export const { useGetChartQuery } = chartSlice;
export default chartSlice.reducer;
