export const STOCK_SCANNER_URI = 'http://reader-service:7771';
export const NEWS_API_URI = 'http://poly-services-service:7007/news';
export const STOCK_API_URI = 'http://poly-services-service:7007/agg';
export const CONFIG_SCANNER_URI = 'http://localhost:8909/pubconfig';
export const POLY_DETAIL_URI = 'http://poly-services-service:7007/detail';
export const POLY_TICKER_URI = 'http://poly-services-service:7007/ticker';
export const EARNINGS_URI = 'http://localhost:8585';
export const PYTHON_CHART_URI = 'http://localhost:8778/chart';
export const RELATED_CO_URI = 'http://poly-services-service:7007/related';

export const CHART_OPTIONS = {
  chart: {
    type: 'candlestick',
    height: 350,
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
