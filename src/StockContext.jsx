import React, { useState, useRef, useEffect } from 'react';
import { createContext } from 'react';
import { SCANNER_WS_URI } from './consts';
import { useAppDispatch, useAppSelector } from './hooks';
import { setChartStocks } from './features/stocksSlice';
import { setTopVolume, setTopGainers } from './features/scannerSlice';
import { LIVE_FEATURE } from './consts';

export const StockContext = createContext();

const StockProvider = ({ children }) => {
  const ws = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (LIVE_FEATURE) {
      ws.current = new WebSocket(SCANNER_WS_URI);
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { sortedGainers, stocks, topGainerList, topVolumeList } = data;
        dispatch(setTopGainers(sortedGainers));
        dispatch(setTopVolume(stocks));
        dispatch(setChartStocks([...topVolumeList, ...topGainerList]));
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      return () => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      };
    }
  }, []);

  return <StockContext.Provider value="">{children}</StockContext.Provider>;
};

export default StockProvider;
