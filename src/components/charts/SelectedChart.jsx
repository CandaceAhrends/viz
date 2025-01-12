import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import {
  selectNextSymbol,
  selectPrevSymbol,
} from '../../features/historicalDataSlice';
import ChartDescription from './ChartDescription';
import Carousel from '../shared/Carousel';

const SelectedChart = ({ timeFrame }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { stock, date } = useAppSelector((state) => state.stocks.selectedChart);
  const [initializing, setInitializing] = useState(true);
  const news = location.state;

  useEffect(() => {
    setTimeout(() => {
      setInitializing(false);
    }, 1000);
  }, []);

  return (
    <Carousel
      enabled={!news}
      onNext={() => dispatch(selectNextSymbol())}
      onPrev={() => dispatch(selectPrevSymbol())}
    >
      {initializing ? (
        <div className="flex flex-col justify-center items-center h-[30rem]">
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
      ) : (
        <>
          <StockChart
            key={stock?.symbol}
            symbol={stock.symbol}
            date={date}
            timeFrame={timeFrame}
          ></StockChart>
          <ChartDescription
            news={news}
            symbol={stock?.symbol}
          ></ChartDescription>
        </>
      )}
    </Carousel>
  );
};

export default SelectedChart;
