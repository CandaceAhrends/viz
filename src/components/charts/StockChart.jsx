import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';
import dayjs from 'dayjs';

let debug = {};

const StockChart = ({ txns, symbol }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    ...CHART_OPTIONS,
    title: {
      ...CHART_OPTIONS.title,
      text: symbol,
    },
  });

  useEffect(() => {
    if (txns && txns.length > 0) {
      //const lastTxn = txns[txns.length - 1];
      //const lastCandleTime = dayjs(lastTxn.x).format('HH:mm');
      // if (debug[symbol] !== lastCandleTime && symbol && symbol === 'TSLA') {
      //   console.log('lastCandleTimeCHART', lastCandleTime, symbol, txns);
      //   console.log('-------------------');
      //   txns.forEach((txn) => {
      //     console.log(dayjs(txn.x).format('HH:mm'));
      //   });
      // }
      // debug[symbol] = lastCandleTime;

      // console.log(lastTxn.x, lastTxn.y, symbol);
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
