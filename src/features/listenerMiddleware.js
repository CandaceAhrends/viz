import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setChartStocks } from './stocksSlice';
import { fetchChartCandles } from './chartSyncSlice';
import dayjs from 'dayjs';
const listenerMiddleware = createListenerMiddleware();

const MAX_STOCKS = 4;

class Synchronizer {
  constructor() {
    this.stocks = [];
    this.time = dayjs();
    this.synchronize = false;
  }
  setStocks(stocks) {
    this.stocks = stocks.slice(0, MAX_STOCKS);
  }
  getStocks() {
    return this.stocks;
  }
  setSynchronized() {
    this.synchronize = true;
  }
  getSynchronized() {
    return this.synchronize;
  }
  checkSynchronized() {
    const currentTime = dayjs();
    const timeDiff = currentTime.diff(this.time, 'minute');
    if (timeDiff >= 1) {
      this.time = currentTime;
      this.synchronize = false;
    }
  }
}

const synchronizer = new Synchronizer();
// const interval = setInterval(() => {
//   synchronizer.checkSynchronized();
// }, 30000);

listenerMiddleware.startListening({
  actionCreator: setChartStocks,

  effect: async (action, { dispatch }) => {
    synchronizer.setStocks(action.payload);
    if (!synchronizer.getSynchronized()) {
      synchronizer.setSynchronized();
      await dispatch(fetchChartCandles(synchronizer.getStocks()));
    }
  },
});

export default listenerMiddleware;
