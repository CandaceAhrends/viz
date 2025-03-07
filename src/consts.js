//* omit
// 7771
export const STOCK_SCANNER_URI = 'http://www.stockmarketviz.com/scapi';
// 7007
export const POLY_SERVICES_URI = 'http://www.stockmarketviz.com/poly';
//export const SCANNER_WS_URI = 'ws://www.stockmarketviz.com/scanner';
export const SCANNER_WS_URI = 'ws://localhost:7775';
export const CHARTS_WS_URI = 'ws://www.stockmarketviz.com/socket';
export const CHARTS_MGR_URL = 'ws://www.stockmarketviz.com/chartsocket';
export const YAHOO_FINANCE_NEWS_URL = 'https://finance.yahoo.com/quote/';

export const STOCK_SELECT_ERROR_MSG =
  'Data is not available for the selected date.';
export const CHART_OPTIONS = {
  chart: {
    type: 'candlestick',
    toolbar: {
      show: false,
    },
  },
  title: {
    align: 'left',
    style: {
      color: '#ffffff',
    },
  },
  tooltip: {
    enabled: false,
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
      style: {
        colors: ['#ffffff'],
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
    lines: {
      show: false,
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
      style: {
        colors: ['#ffffff'],
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
    },
    lines: {
      show: false,
    },
  },
};

export const LIVE_FEATURE = true;
