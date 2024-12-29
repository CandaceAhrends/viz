import dayjs from 'dayjs';
import { getDateForChart } from '../../utils';

export const aggregateCandleData = ({ candles, lastCandle }) => {
  const [candle] = [
    candles.reduce((minuteCandle, { x, y }, index) => {
      const [open, high, low, close] = y;
      const validData = open && high && low && close;
      if (!validData) {
        return minuteCandle;
      }
      if (index === 0) {
        minuteCandle.open = open;
        minuteCandle.high = high;
        minuteCandle.low = low;
      }
      minuteCandle.high = Math.max(minuteCandle.high, high);
      minuteCandle.low = Math.min(minuteCandle.low, low);
      minuteCandle.close = close;
      return minuteCandle;
    }, {}),
  ].map((candle) => {
    return {
      x: lastCandle.x,
      y: [candle.open, candle.high, candle.low, candle.close],
    };
  });

  return candle;
};

export const getCandle = (data, candleTime) => {
  const candle = {
    x: candleTime,
    y: [data.open, data.high, data.low, data.close],
  };
  return candle;
};

export const appendCandle = ({ collectedCandles, candle, symbol }) => {
  const mchartData = collectedCandles.current.get(symbol) || [];
  mchartData.push(candle);
  collectedCandles.current.set(symbol, mchartData);
};

export const updateChartByMinute = ({
  data,
  collectedCandles,
  chartTime,
  chartMap,
  chartDate,
  activeCandles,
}) => {
  const candleDate = getDateForChart(data.time);
  chartTime.current.set(data.symbol, data.time);
  chartDate.current.set(data.symbol, candleDate);
  const activeCandle = activeCandles.current.get(data.symbol);
  if (activeCandle) {
    activeCandles.current.delete(data.symbol);
    const stockMapCandles = [...chartMap.current.get(data.symbol)];
    stockMapCandles.push(activeCandle);
    chartMap.current.set(data.symbol, stockMapCandles.slice(-50));
  }
  collectedCandles.current.set(data.symbol, []);
  return candleDate;
};

export const updateLiveChart = ({
  collectedCandles,
  chartDate,
  chartMap,
  activeCandles,
}) => {
  const updatedMap = new Map();
  collectedCandles.current.forEach((candles, key) => {
    if (!chartMap.current.has(key)) return;
    const stockMapCandles = [...chartMap.current.get(key)];
    const lastCandle = stockMapCandles.pop();
    lastCandle.x = chartDate.current.get(key);
    let candle = aggregateCandleData({ candles, lastCandle });

    stockMapCandles.push(candle);
    activeCandles.current.set(key, candle);
    updatedMap.set(key, stockMapCandles);
  });
  return updatedMap;
};
