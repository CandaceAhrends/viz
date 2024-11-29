import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PYTHON_CHART_URI } from '../consts';
export type Channel = 'redux' | 'general';

export const chartApiSlice = createApi({
  reducerPath: 'chartApi',
  baseQuery: fetchBaseQuery({ baseUrl: PYTHON_CHART_URI }),
  endpoints: (build) => ({
    getChart: build.query<Message[], Channel>({
      queryFn() {
        return { data: [] };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost:8091');
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          ws.onopen = (event) => {
            console.log('opened socket');
          };
          ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            console.log(`[message] Data received from server: ${json}`);
            try {
              if ((json.event = 'data')) {
                updateCachedData((draft) => {
                  draft.push(json);
                });
                console.log(json.data);
              }
            } catch (err) {}
          };
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        await cacheEntryRemoved;

        ws.close();
      },
    }),
  }),
});
export const { useGetChartQuery } = chartApiSlice;
export default chartApiSlice.reducer;
