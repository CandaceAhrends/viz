import React, { useEffect, useState, memo } from 'react';
import Chart from 'react-apexcharts';
import { CHART_OPTIONS } from '../../consts';
import dayjs from 'dayjs';
import './charts.scss';

const StockChart = ({ txns, symbol, date }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (txns && txns.length > 0) {
      setSeries([{ data: txns }]);
      const titleDate = dayjs(date).format('MMM DD, YYYY');
      const title = `${symbol} - ${titleDate}`;

      setOptions({
        ...CHART_OPTIONS,
        title: {
          ...CHART_OPTIONS.title,
          text: title,
        },
      });
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

export default memo(StockChart, (prevProps, nextProps) => {
  return prevProps.symbol === nextProps.symbol;
});
