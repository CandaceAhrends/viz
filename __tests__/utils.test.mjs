import dayjs from 'dayjs';
import {
  formatDate,
  getDateForChart,
  getPreviousMarketDate,
  getNextSymbol,
  getPrevSymbol,
  isOnOrAfterLastMarketDate,
  buildTiingoStocklist,
  filterScannerResults,
} from '../src/utils';

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = dayjs('2022-01-01');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('01/01/2022');
  });
});

describe('getDateForChart', () => {
  it('should return the date in the correct format for chart', () => {
    const time = '2022-01-01T00:00:00Z';
    const dateForChart = getDateForChart(time);
    expect(dateForChart).toBe('2022-01-01');
  });
});

describe('getPreviousMarketDate', () => {
  it('should return the previous market date', () => {
    const date = dayjs('2022-01-03');
    const previousMarketDate = getPreviousMarketDate(date);
    expect(previousMarketDate).toBe('2022-01-02');
  });
});

describe('getNextSymbol', () => {
  it('should return the next symbol', () => {
    const selectedStock = 'AAPL';
    const filteredStocks = ['AAPL', 'GOOGL', 'MSFT'];
    const nextSymbol = getNextSymbol({ selectedStock, filteredStocks });
    expect(nextSymbol).toBe('GOOGL');
  });
});

describe('getPrevSymbol', () => {
  it('should return the previous symbol', () => {
    const selectedStock = 'GOOGL';
    const filteredStocks = ['AAPL', 'GOOGL', 'MSFT'];
    const prevSymbol = getPrevSymbol({ selectedStock, filteredStocks });
    expect(prevSymbol).toBe('AAPL');
  });
});

describe('isOnOrAfterLastMarketDate', () => {
  it('should return true if the date is on or after the last market date', () => {
    const date = dayjs('2022-01-03');
    const isOnOrAfterLastDate = isOnOrAfterLastMarketDate(date);
    expect(isOnOrAfterLastDate).toBe(true);
  });

  it('should return false if the date is before the last market date', () => {
    const date = dayjs('2022-01-01');
    const isOnOrAfterLastDate = isOnOrAfterLastMarketDate(date);
    expect(isOnOrAfterLastDate).toBe(false);
  });
});

describe('buildTiingoStocklist', () => {
  it('should build the Tiingo stocklist correctly', () => {
    const stocks = ['AAPL', 'GOOGL', 'MSFT'];
    const tiingoStocklist = buildTiingoStocklist(stocks);
    expect(tiingoStocklist).toEqual([
      { symbol: 'AAPL' },
      { symbol: 'GOOGL' },
      { symbol: 'MSFT' },
    ]);
  });
});

describe('filterScannerResults', () => {
  it('should filter the scanner results correctly', () => {
    const config = { minPrice: 50, maxPrice: 100 };
    const scannerResults = [
      { symbol: 'AAPL', price: 80 },
      { symbol: 'GOOGL', price: 120 },
      { symbol: 'MSFT', price: 90 },
    ];
    const filteredResults = filterScannerResults(config, scannerResults);
    expect(filteredResults).toEqual([
      { symbol: 'AAPL', price: 80 },
      { symbol: 'MSFT', price: 90 },
    ]);
  });
});
