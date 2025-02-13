import dayjs from 'dayjs';

const summaryColors = ['blue', 'purple', 'orange'];

export const formatDateTime = (date) => {
  return dayjs(date).format('ddd, MMM DD HH:mm A');
};
export const formatDate = (date) => {
  return dayjs(date).format('MM-DD-YYYY');
};

export const getDateForChart = (time) => {
  try {
    const [hour, minute] = time.split(':');
    const currentChartDate = dayjs()
      .set('hour', parseInt(hour))
      .set('minute', parseInt(minute))
      .set('second', 0);
    return currentChartDate;
  } catch (e) {
    throw new Error('Invalid time format');
  }
};

export const MARKET_CLOSED = [
  dayjs('2025-01-09'),
  dayjs('2025-01-02'),
  dayjs('2025-01-01'),
];

export const getPreviousMarketDate = (dateOverride) => {
  const date = dateOverride || dayjs();
  let previousDate = dayjs(date); //.subtract(1, 'day');
  if (previousDate.day() === 0) {
    previousDate = previousDate.subtract(2, 'day');
  } else if (previousDate.day() === 6) {
    previousDate = previousDate.subtract(1, 'day');
  }
  const compareDate = dayjs(previousDate.format('YYYY-MM-DD'));
  if (MARKET_CLOSED.find((d) => d.isSame(compareDate))) {
    return getPreviousMarketDate(previousDate);
  }
  return previousDate.format('YYYY-MM-DD');
};

export const getNextSymbol = ({ selectedStock, filteredStocks }) => {
  if (filteredStocks.length === 1) {
    return filteredStocks[0];
  }
  const currentIndex = filteredStocks.findIndex(
    (stock) => stock.symbol === selectedStock.symbol
  );
  const nextIndex = currentIndex + 1;
  if (nextIndex >= filteredStocks.length) {
    return filteredStocks[0];
  }
  return filteredStocks[nextIndex];
};
export const getPrevSymbol = ({ selectedStock, filteredStocks }) => {
  if (filteredStocks.length === 1) {
    return filteredStocks[0];
  }
  const currentIndex = filteredStocks.findIndex(
    (stock) => stock.symbol === selectedStock.symbol
  );
  const prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    return filteredStocks[filteredStocks.length - 1];
  }
  return filteredStocks[prevIndex];
};

export const buildTiingoStocklist = (stocks) => {
  return stocks.map((s) => s.toLowerCase()).join(',');
};

export const filterScannerResults = (config) => {
  return (stock) => {
    return (
      stock.vw >= config.minPrice &&
      stock.vw <= config.maxPrice &&
      Number.parseFloat(stock.percent) >= config.minChange &&
      Number.parseFloat(stock.percent) <= config.maxChange
    );
  };
};

export const generateChartCandles = (data) => {
  return data.map((d) => {
    const time = dayjs(d.t).format('HH:mm');
    const currentChartDate = getDateForChart(time);
    const { o, h, l, c } = d;
    return {
      x: currentChartDate,
      y: [o, h, l, c],
    };
  });
};

export const buildStockSummary = (summaryStocks) => {
  return summaryStocks.map((stock, index) => {
    const change = stock.diff;

    return {
      name: stock.symbol,
      price: stock.vw.toFixed(2),
      change: `${change.toFixed(2)}`,
      percent: stock.percent.toFixed(2) + '%',
      color: summaryColors[index],
      isPositive: stock.isPositive,
    };
  });
};

export const title = (title) => {
  return title[0].toUpperCase() + title.slice(1);
};
export const debounce = (fn) => {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), 500);
  };
};
