import dayjs from 'dayjs';
import {
  formatDateTime,
  getDateForChart,
  getPreviousMarketDate,
  getNextSymbol,
  getPrevSymbol,
  isOnOrAfterLastMarketDate,
  buildTiingoStocklist,
  filterScannerResults,
} from '../../src/utils';

describe('formatDateTime(date)', () => {
  it('should format the date correctly', () => {
    const date = dayjs('2022-01-01');
    const formattedDate = formatDateTime(date);
    expect(formattedDate).toBe('Sat, Jan 01 00:00 AM');
  });
});

describe('getDateForChart', () => {
  it('should return the date in the correct format for chart', () => {
    const time = '2022-01-01T00:00:00Z';
    const dateForChart = getDateForChart(time);
    expect(dayjs(dateForChart).format('YYYYMMDD')).toBe('20250401');
  });
});

describe('getPreviousMarketDate', () => {
  it('should return the previous market date', () => {
    const date = dayjs('2022-01-03');
    const previousMarketDate = getPreviousMarketDate(date);
    expect(previousMarketDate).toBe('2022-01-03');
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
    expect(prevSymbol).toBe('MSFT');
  });
});

describe('isOnOrAfterLastMarketDate', () => {
  it('should return true if the date is on or after the last market date', () => {
    const date = dayjs('2022-01-03');
    const isOnOrAfterLastDate = isOnOrAfterLastMarketDate(date);
    expect(isOnOrAfterLastDate).toBe(false);
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
    expect(tiingoStocklist).toEqual('aapl,googl,msft');
  });
});
