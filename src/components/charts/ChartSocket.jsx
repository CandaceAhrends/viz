import React, { act, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import chartTransactions from './ChartTransactions';
import ChartWrapper from './ChartWrapper';
import {
  updateChartByMinute,
  getCandle,
  appendCandle,
  updateLiveChart,
  getInitialChartCandles,
  deriveSymbols,
} from './utils';

const SOCKET_URL = 'ws://localhost:8082'; //'ws://localhost:8082'

const ChartSocket = () => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const [socketReady, setSocketReady] = useState(0);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const ws = useRef(null);
  const chartMap = useRef(new Map());
  const collectedCandles = useRef(new Map());
  const activeCandles = useRef(new Map());
  const chartTime = useRef(new Map());
  const chartDate = useRef(new Map());

  useEffect(() => {
    if (!stockDataMap) return;
    chartMap.current = new Map(getInitialChartCandles(stockDataMap));
    setStocksOfInterest(deriveSymbols(chartMap));
  }, [stockDataMap]);

  useEffect(() => {
    if (ws.current && ws.current.readyState === 1 && stocksOfInterest) {
      const date = '2024-12-27';
      ws.current.send(JSON.stringify({ date, symbols: stocksOfInterest }));
    }
  }, [socketReady, stocksOfInterest]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMap = updateLiveChart({
        collectedCandles,
        chartMap,
        activeCandles,
        chartDate,
      });
      if (updatedMap.size === 0) return;
      chartTransactions.setLiveChart(updatedMap);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //8082
    ws.current = new WebSocket(SOCKET_URL);
    ws.current.onopen = () => {
      setSocketReady((prev) => prev + 1);
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const symbol = data.symbol;

      let candleChartTime = chartDate.current.get(symbol);
      const lastSymbolTime = chartTime.current.get(symbol);
      if (data.time !== lastSymbolTime) {
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

  return <ChartWrapper stocks={stocksOfInterest}></ChartWrapper>;
};

export default ChartSocket;
