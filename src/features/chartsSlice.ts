import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Channel = 'redux' | 'general';

class StockList {
  stocks: string[];
  constructor() {
    this.stocks = [];
  }
  setStocks(stocks: []) {
    this.stocks = stocks;
  }
  getStocks() {
    return this.stocks;
  }
}
const stockList = new StockList();

export const chartApiSlice = createApi({
  reducerPath: 'chartApi',

  baseQuery: fetchBaseQuery({ baseUrl: PYTHON_CHART_URI }),
  endpoints: (build) => ({
    getChart: build.query<Message[], Channel>({
      queryFn(stocks) {
        stockList.setStocks(stocks);
        return { data: [] };
      },
      async onCacheEntryAdded(
        stocks,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        // const ws = new WebSocket('ws://stockmarketviz.com/stocksocket');
        const ws = new WebSocket('ws://www.stockmarketviz.com:8082');

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          ws.onopen = (event) => {
            console.log('opened socket');
          };
          ws.onmessage = function (event) {
            const data = JSON.parse(event.data);

            try {
              if (stockList.getStocks().includes(data?.symbol)) {
                updateCachedData((draft) => {
                  const symbol = data.symbol;
                  const txns = draft.find((txn) => txn.symbol === symbol) || {
                    symbol,
                    data: [],
                  };
                  const updatedTxns = { ...txns, data: [...txns.data, data] };
                  draft.push(updatedTxns);
                });
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
