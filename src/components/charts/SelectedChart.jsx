import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchStockCandles } from '../../services';
import StockChart from './StockChart';
import { useLocation } from 'react-router-dom';
import {
  selectNextSymbol,
  selectPrevSymbol,
} from '../../features/historicalDataSlice';
import { LineWave } from 'react-loader-spinner';
import ChartDescription from './ChartDescription';
import Carousel from '../shared/Carousel';

const SelectedChart = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [candles, setCandles] = useState([]);

  const { stock, date } = useAppSelector((state) => state.stocks.selectedChart);
  const [hasError, setHasError] = useState(false);
  const news = location.state;

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

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      {candles && candles.length ? (
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          <Carousel
            onNext={() => dispatch(selectNextSymbol())}
            onPrev={() => dispatch(selectPrevSymbol())}
          >
            <StockChart
              key={stock?.symbol}
              txns={candles}
              symbol={stock.symbol}
              date={date}
            ></StockChart>
            <ChartDescription
              news={news}
              symbol={stock?.symbol}
            ></ChartDescription>
          </Carousel>
        </div>
      ) : hasError ? (
        <div className="flex justify-center mt-10">
          <button
            className="rounded-md bg-slate-900 hover:bg-slate-800 text-white p-2 w-50 h-10"
            onClick={goBack}
          >
            Error loading chart. Return to list
          </button>
        </div>
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
