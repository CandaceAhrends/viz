import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { fetchStockCandles } from '../../services';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';
import dayjs from 'dayjs';

const SelectedChart = () => {
  const [candles, setCandles] = useState([]);
  const { stock, date } = useAppSelector((state) => state.stocks.selectedChart);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchChart = async () => {
      const symbol = stock?.symbol;
      const { data, error } = await fetchStockCandles({ symbol, date });
      if (error) {
        setHasError(true);
        return;
      }
      setCandles([...data]);
    };

    if (stock && date) {
      fetchChart();
    }
  }, [stock]);

  return (
    <>
      {candles && candles.length ? (
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          <StockChart
            key={stock?.symbol}
            txns={candles}
            symbol={stock.symbol}
            date={date}
          ></StockChart>
        </div>
      ) : hasError ? (
        <p>err</p>
      ) : (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <p className="text-lg">Loading Charts...</p>
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      )}
    </>
  );
};

export default SelectedChart;
