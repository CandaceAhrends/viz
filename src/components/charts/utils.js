import dayjs from 'dayjs';

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

export const addNewCandle = (candles) => {
  const [lastCandle] = candles.slice(-1);
  const dt = lastCandle.x;
  let currentCandleTime = dayjs(dt);
  const currentCandleTimeMinAdd = currentCandleTime.add(1, 'minute');
  const appendCandle = {
    x: currentCandleTimeMinAdd,
    y: lastCandle.y,
  };
  candles.push(appendCandle);
  return candles;
};
