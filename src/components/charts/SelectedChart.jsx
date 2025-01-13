import React, { useState, useEffect, Suspense } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoadingFallback from './LoadingFallback';
import { useLocation } from 'react-router-dom';
import ChartDescription from './ChartDescription';
const StockChart = React.lazy(() => import('./StockChart'));

const SelectedChart = ({ timeFrame }) => {
  const location = useLocation();
  const { stock, date } = useAppSelector((state) => state.stocks.selectedChart);
  const news = location.state;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <StockChart
        key={stock?.symbol}
        symbol={stock.symbol}
        date={date}
        timeFrame={timeFrame}
      ></StockChart>
      {news && (
        <ChartDescription news={news} symbol={stock?.symbol}></ChartDescription>
      )}
    </Suspense>
  );
};

export default SelectedChart;
