import dayjs from 'dayjs';

export const formatDate = (date) => {
  return dayjs(date).format('ddd, MMM DD HH:mm A');
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

const testing = false;
export const getPreviousMarketDate = (date) => {
  if (testing) {
    return dayjs(date).format('YYYY-MM-DD');
  }
  let previousDate = dayjs(date).subtract(1, 'day');
  if (previousDate.day() === 0) {
    // If the previous date is a Sunday, subtract 2 more days to skip the weekend
    previousDate = previousDate.subtract(2, 'day');
  } else if (previousDate.day() === 6) {
    // If the previous date is a Saturday, subtract 1 more day to skip the weekend
    previousDate = previousDate.subtract(1, 'day');
  }
  return previousDate.format('YYYY-MM-DD');
};

export const getNextSymbol = ({ selectedStock, filteredStocks }) => {
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
  const currentIndex = filteredStocks.findIndex(
    (stock) => stock.symbol === selectedStock.symbol
  );
  const prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    return filteredStocks[filteredStocks.length - 1];
  }
  return filteredStocks[prevIndex];
};

export const isOnOrAfterLastMarketDate = (date) => {
  const currentDate = dayjs();
  if (currentDate.isSame(date, 'day')) {
    return true;
  }
  const lastMarketDate = getPreviousMarketDate(currentDate);
  return (
    dayjs(date).isAfter(lastMarketDate) || dayjs(date).isSame(lastMarketDate)
  );
};

export const buildTiingoStocklist = (stocks) => {
  return stocks.map((s) => s.toLowerCase()).join(',');
};

export const filterScannerResults = (config) => {
  return (stock) => {
    console.log('stock --------', stock.symbol);
    console.log(Number.parseFloat(stock.percent));
    console.log('config.minChange', config.minChange);
    console.log(Number.parseFloat(stock.percent) >= config.minChange);
    console.log('------------------');
    return (
      stock.vw >= config.minPrice &&
      stock.vw <= config.maxPrice &&
      Number.parseFloat(stock.percent) >= config.minChange &&
      Number.parseFloat(stock.percent) <= config.maxChange
    );
  };
};
