import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';
import { aggregateCandleData, addNewCandle } from './utils';

const ChartSocket = () => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  const [liveChart, setLiveChart] = useState(new Map());
  const ws = useRef(null);
  const chartMap = useRef(new Map());
  const minuteData = useRef(new Map());

  useEffect(() => {
    if (!stockDataMap) return;

    const mapData = Object.entries(JSON.parse(stockDataMap)).map(
      ([key, value]) => {
        return [key, value];
      }
    );
    chartMap.current = new Map(mapData);
  }, [stockDataMap]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMap = new Map();
      minuteData.current.forEach((candles, key) => {
        if (!chartMap.current.has(key)) return;
        const stockMapCandles = [...chartMap.current.get(key)];
        const lastCandle = stockMapCandles.pop();
        const candle = aggregateCandleData({ candles, lastCandle });
        stockMapCandles.push(candle);
        updatedMap.set(key, stockMapCandles);
      });
      setLiveChart((prev) => new Map([...updatedMap]));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMap = new Map();
      chartMap.current.forEach((candles, key) => {
        if (!candles.length) return;
        const updatedCandles = addNewCandle({ candles });
        updatedMap.set(key, updatedCandles);
      });
      chartMap.current = new Map([...updatedMap]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //8082
    ws.current = new WebSocket('ws://www.stockmarketviz.com/socket');
    ws.current.onopen = () => {
      console.log('WebSocket opened');
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const symbol = data.symbol;
      if (chartMap.current.has(symbol)) {
        const candle = {
          x: null,
          y: [data.open, data.high, data.low, data.close],
        };
        const mchartData = minuteData.current.get(symbol) || [];
        mchartData.push(candle);
        minuteData.current.set(symbol, mchartData);
      }
    };
    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <>
      {chartMap.current.size ? (
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          <div
            className={`${
              isScannerOpen
                ? 'md:flex md:w-[90%] flex-col'
                : 'lg:flex lg:flex-wrap'
            }  `}
          >
            {Array.from(chartMap.current.keys()).map((symbol) => (
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

export default ChartSocket;
