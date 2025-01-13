import React, { useEffect, useState, Suspense } from 'react';
import LoadingFallback from './LoadingFallback';
const Chart = React.lazy(() => import('react-apexcharts'));
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
    <Suspense fallback={<LoadingFallback />}>
      {error ? (
        <div className="spinner-container h-[20rem]">
          <div className="spinner"></div>
        </div>
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
    </Suspense>
  );
};

export default StockChart;
