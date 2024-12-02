export const STOCK_SCANNER_URI = 'http://stockmarketviz.com';
export const POLY_SERVICES_URI = 'http://stockmarketviz.com/poly-services';
export const CONFIG_SCANNER_URI = 'http://localhost:8909/pubconfig';
export const EARNINGS_URI = 'http://localhost:8585';
export const PYTHON_CHART_URI = 'http://localhost:8778/chart';

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
