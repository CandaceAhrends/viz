import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';

const ChartWrapper = () => {
  const isScannerOpen = useAppSelector((state) => state.isScannerOpen);
  const historicalCharts = useAppSelector(
    (state) => state.historicalData.historicalCharts
  );
  const [liveChart, setLiveChart] = useState(new Map());
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (historicalCharts.length) {
      const charts = JSON.parse(historicalCharts);
      const chartsMap = new Map(charts);
      setLiveChart(chartsMap);
      setStocks([...chartsMap.keys()]);
    }
  }, [historicalCharts]);

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
