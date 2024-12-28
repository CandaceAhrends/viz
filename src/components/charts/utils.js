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

export const getChartTime = (chartDate, chartTime) => {
  const [hour, minute] = chartTime.split(':');
  const currentChartDate = chartDate
    .set('hour', parseInt(hour))
    .set('minute', parseInt(minute));

  return currentChartDate;
};

export const updateChartByMinute = ({
  data,
  collectedCandles,
  chartTime,
  chartMap,
  chartDate,
  activeCandles,
}) => {
  chartTime.current = data.time;
  const candleChartTime = getChartTime(chartDate.current, data.time);
  chartDate.current = candleChartTime;
  chartMap.current.forEach((chartCandles, key) => {
    const activeCandle = activeCandles.current.get(key);
    if (!activeCandle) return;
    activeCandles.current.delete(key);
    chartCandles.push(activeCandle);
  });
  collectedCandles.current = new Map();
  return candleChartTime;
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
    lastCandle.x = chartDate.current;
    let candle = aggregateCandleData({ candles, lastCandle });

    stockMapCandles.push(candle);
    activeCandles.current.set(key, candle);
    updatedMap.set(key, stockMapCandles);
  });
  return updatedMap;
};
