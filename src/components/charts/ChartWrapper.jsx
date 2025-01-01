import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import StockChart from './StockChart';
import { setChartsLoaded } from '../../features/stocksSlice';
import { LineWave } from 'react-loader-spinner';

const ChartWrapper = () => {
  const isScannerOpen = useAppSelector((state) => state.isScannerOpen);
  const date = useAppSelector((state) => state.stocks.date);
  const reloadCharts = useAppSelector((state) => state.stocks.reloadCharts);
  const historicalCharts = useAppSelector(
    (state) => state.historicalData.historicalCharts
  );
  const [liveChart, setLiveChart] = useState(new Map());
  const [stocks, setStocks] = useState([]);
  const [delayedStocks, setDelayedStocks] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (historicalCharts.length) {
      const charts = JSON.parse(historicalCharts);
      const chartsMap = new Map(charts);
      dispatch(setChartsLoaded());
      setLiveChart(chartsMap);
      setStocks([...chartsMap.keys()]);
    }
  }, [historicalCharts, date]);

  useEffect(() => {
    let timeoutId;
    let index = 0;

    const renderNextStock = () => {
      if (index < stocks.length) {
        setDelayedStocks((prev) => [...prev, stocks[index]]);
        index++;
        timeoutId = setTimeout(renderNextStock, 1000); // Wait one second
      }
    };

    renderNextStock();

    return () => clearTimeout(timeoutId);
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
            {delayedStocks.map((symbol) => (
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
