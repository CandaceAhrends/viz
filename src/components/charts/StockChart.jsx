import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';
import './charts.scss';

const StockChart = ({ txns, symbol }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
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
      setLoading(false);
    }
  }, [txns]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center h-[10rem] m-10 ">
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      ) : (
        <Chart
          className="text-black mr-3"
          options={options}
          series={series}
          type="candlestick"
        />
      )}
    </div>
  );
};

export default StockChart;
