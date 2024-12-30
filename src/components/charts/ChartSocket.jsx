import React, { act, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import ChartWrapper from './ChartWrapper';
import chartTransactions from './ChartTransactions';
import { CHARTS_MGR_URL } from '../../consts';
import { deriveSymbols } from './utils';

const SOCKET_URL = 'ws://localhost:8777'; //'ws://localhost:8082'
const LIVE = true;

const ChartSocket = () => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const [stocksOfInterest, setStocksOfInterest] = useState([]);
  const ws = useRef(null);
  const socketPending = useRef(false);

  useEffect(() => {
    if (!stockDataMap) return;

    setStocksOfInterest(deriveSymbols(stockDataMap));
  }, [stockDataMap]);

  useEffect(() => {
    //8082
    if (!socketPending.current) {
      ws.current = new WebSocket(CHARTS_MGR_URL);
      socketPending.current = true;
    }
    ws.current.onopen = () => {
      socketPending.current = false;
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const updatedMap = new Map(Object.entries(data));
      chartTransactions.setLiveChart(updatedMap);
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
