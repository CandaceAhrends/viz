import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';

const StockChart = ({ txns, symbol }) => {
  const [series, setSeries] = useState([]);
  const [options] = useState({
    ...CHART_OPTIONS,
    title: {
      ...CHART_OPTIONS.title,
      text: symbol,
    },
  });

  useEffect(() => {
    if (txns && txns.length > 0) {
      setSeries([{ data: txns }]);
    }
  }, [txns]);

  return (
    <Chart
      className="text-black mr-3"
      options={options}
      series={series}
      type="candlestick"
    />
  );
};

export default StockChart;
