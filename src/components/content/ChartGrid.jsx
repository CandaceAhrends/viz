import React, { useEffect, useState } from 'react';
import StockChart from '../charts/StockChart';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetChartQuery } from '../../features/chartsSlice';

const ChartGrid = () => {
  const { stocks } = useAppSelector((state) => state.stocks);
  const { data, error, isLoading } = useGetChartQuery(stocks);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const txn = data.map((d) => d[0]);
      setChartData(txn);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {stocks.map(
        (stock, index) =>
          !isLoading && (
            <div key={stock} className="bg-black border b-slate-200 p-4">
              <StockChart symbol={stock} data={chartData} />
            </div>
          )
      )}
    </div>
  );
};

export default ChartGrid;
