import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetChartQuery } from '../../features/chartSlice';
import { CHART_OPTIONS } from '../../consts';
import { formatDate, generateChartCandles } from '../../utils';
import './charts.scss';

const StockChart = ({ symbol, date, timeFrame }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(CHART_OPTIONS);
  const { data, error, isLoading } = useGetChartQuery({
    symbol,
    date,
    timeFrame,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      console.log('got chart data');
      const candles = generateChartCandles(data);
      setSeries([{ data: candles }]);
      const title = `${symbol} - ${formatDate(date)}`;
      setOptions({
        ...CHART_OPTIONS,
        title: {
          ...CHART_OPTIONS.title,
          text: title,
        },
      });
    }
  }, [data]);

  return (
    <div>
      {error ? (
        <p>error</p>
      ) : isLoading ? (
        <div className="spinner-container h-[20rem]">
          <div className="spinner"></div>
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
