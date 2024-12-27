import React, { useState, useRef, useEffect } from 'react';
import { createContext } from 'react';
import { SCANNER_WS_URI } from './consts';
import { useAppDispatch, useAppSelector } from './hooks';
import { setChartStocks } from './features/stocksSlice';
import { setTopVolume, setTopGainers } from './features/scannerSlice';
import { fetchPolyDetail } from './services';

export const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState('UPST');
  const [selectedQuote, setSelectedQuote] = useState('UPST');
  const ws = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchPolyDetail(selectedStock);
        setSelectedQuote(data?.ticker);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, [selectedStock]);

  return (
    <StockContext.Provider
      value={{ selectedStock, setSelectedStock, selectedQuote }}
    >
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
