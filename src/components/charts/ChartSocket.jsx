import React, { act, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import StockChart from './StockChart';
import { LineWave } from 'react-loader-spinner';
import {
  updateChartByMinute,
  getCandle,
  appendCandle,
  updateLiveChart,
} from './utils';
import dayjs from 'dayjs';

const ChartSocket = () => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  const [liveChart, setLiveChart] = useState(new Map());

  const ws = useRef(null);
  const chartMap = useRef(new Map());
  const collectedCandles = useRef(new Map());
  const activeCandles = useRef(new Map());
  const chartTime = useRef('');
  const chartDate = useRef(dayjs());
  // console.log('reload chart socket again for ');
  useEffect(() => {
    if (!stockDataMap) return;

    const mapData = Object.entries(JSON.parse(stockDataMap)).map(
      ([key, value]) => {
        const testData = {
          ts: dayjs(),
          open: 4474,
          high: 447,
          low: 447,
          close: 447,
        };

        const candle = getCandle(testData, dayjs());

        return [key, [candle]];
      }
    );
    chartMap.current = new Map(mapData);
  }, [stockDataMap]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMap = updateLiveChart({
        collectedCandles,
        chartMap,
        activeCandles,
        chartDate,
      });
      if (updatedMap.size === 0) return;
      setLiveChart((prev) => new Map([...updatedMap]));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //8082
    ws.current = new WebSocket('ws://localhost:8082');
    ws.current.onopen = () => {
      console.log('WebSocket opened', ws.current.readyState);
      if (ws.current.readyState) {
        const symbols = Array.from(chartMap.current.keys());
        const date = new Date();
        ws.current.send(JSON.stringify({ date, symbols }));
      }
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const symbol = data.symbol;
      let candleChartTime = chartDate.current;
      if (data.time !== chartTime.current) {
        candleChartTime = updateChartByMinute({
          data,
          collectedCandles,
          chartTime,
          chartMap,
          chartDate,
          activeCandles,
        });
      }
      const candle = getCandle(data, candleChartTime);
      appendCandle({ collectedCandles, candle, symbol });
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
      {liveChart && liveChart.size ? (
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
