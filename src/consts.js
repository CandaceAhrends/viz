export const STOCK_SCANNER_URI = 'http://www.stockmarketviz.com:7771';
export const POLY_SERVICES_URI = 'http://www.stockmarketviz.com:7007';

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
