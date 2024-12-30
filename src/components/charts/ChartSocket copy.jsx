import React, { act, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import chartTransactions from './ChartTransactions';
import ChartWrapper from './ChartWrapper';
import { CHARTS_WS_URI } from '../../consts';
import {
  updateChartByMinute,
  getCandle,
  appendCandle,
  updateLiveChart,
  getInitialChartStocks,
  deriveSymbols,
} from './utils';

const SOCKET_URL = 'ws://localhost:8082'; //'ws://localhost:8082'
const LIVE = true;

const ChartSocket = () => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const ws = useRef(null);
  const socketPending = useRef(false);
  const chartMap = useRef(new Map());
  const collectedCandles = useRef(new Map());
  const activeCandles = useRef(new Map());
  const chartTime = useRef(new Map());
  const chartDate = useRef(new Map());

  useEffect(() => {
    if (!stockDataMap) return;
    chartMap.current = new Map(getInitialChartStocks(stockDataMap));
    setStocksOfInterest(deriveSymbols(stockDataMap));
    chartTransactions.setLiveChart(chartMap.current);
  }, [stockDataMap]);

  useEffect(() => {
    if (LIVE) {
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
    }
  }, []);

  useEffect(() => {
    //8082
    if (!socketPending.current) {
      ws.current = new WebSocket(CHARTS_WS_URI);
      socketPending.current = true;
    }
    ws.current.onopen = () => {
      socketPending.current = false;
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const symbol = data.symbol;
      if (chartMap.current.get(symbol)) {
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

  return <ChartWrapper stocks={stocksOfInterest}></ChartWrapper>;
};

export default ChartSocket;
