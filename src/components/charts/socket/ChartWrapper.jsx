import React, { useState, useRef, useEffect } from 'react';
import chartTransactions from './ChartTransactions';
import { useAppSelector } from '../../hooks';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';

const LIVE = true;

const ChartWrapper = ({ stocks }) => {
  const isScannerOpen = useAppSelector((state) => state.isScannerOpen);
  const [liveChart, setLiveChart] = useState(new Map());

  useEffect(() => {
    if (LIVE) {
      const interval = setInterval(() => {
        const chart = chartTransactions.getLiveChart();

        setLiveChart((prev) => new Map([...chart]));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setLiveChart(chartTransactions.getLiveChart());
    }
  }, [stocks]);

  return (
    <>
      {liveChart && liveChart.size ? (
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          <div
            className={`${
              isScannerOpen
                ? 'md:flex md:w-[90%] flex-col'
                : 'lg:flex lg:flex-wrap'
            }  `}
          >
            {stocks.map((symbol) => (
              <StockChart
                key={symbol}
                txns={liveChart.get(symbol)}
                symbol={symbol}
              ></StockChart>
            ))}
          </div>
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

export default ChartWrapper;
