// 7771
export const STOCK_SCANNER_URI = 'http://www.stockmarketviz.com/scapi';
// 7007
export const POLY_SERVICES_URI = 'http://www.stockmarketviz.com/poly';
export const SCANNER_WS_URI = 'ws://www.stockmarketviz.com/scanner';
export const YAHOO_FINANCE_NEWS_URL = 'https://finance.yahoo.com/quote/';
export const CHART_OPTIONS = {
  chart: {
    type: 'candlestick',
  },
  series: [
    {
      data: [],
    },
  ],
  grid: {
    show: false,
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#0FEDBE', // Green for bullish candles
        downward: '#F63D6B', // Red for bearish candles
      },
    },
  },
  yaxis: {
    opposite: true,
    labels: {
      formatter: function (value) {
        return value.toFixed(2);
      },
    },
    lines: {
      show: false,
    },
  },
  xaxis: {
    type: 'datetime',
    lines: {
      show: false, // This hides the horizontal lines
    },
  },
};
