import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';

const StockChart = ({ txns, symbol }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    ...CHART_OPTIONS,
    title: {
      text: symbol,
    },
  });

  useEffect(() => {
    if (txns && txns.length > 0) {
      const lastTxn = txns[txns.length - 1];
      console.log(lastTxn.x, lastTxn.y, symbol);
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
