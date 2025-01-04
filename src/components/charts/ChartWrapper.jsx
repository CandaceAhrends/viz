import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import StockChart from './StockChart';
import { setChartsLoaded } from '../../features/stocksSlice';

const ChartWrapper = () => {
  const isScannerOpen = useAppSelector((state) => state.isScannerOpen);
  const date = useAppSelector((state) => state.stocks.date);

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
        setDelayedStocks(stocks.slice(0, index + 1));
        timeoutId = setTimeout(renderNextStock, 1000);
        index++;
      }
    };

    renderNextStock();

    return () => clearTimeout(timeoutId);
  }, [stocks]);

  return (
    <>
      {liveChart && liveChart.size && (
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
      )}
    </>
  );
};

export default ChartWrapper;
