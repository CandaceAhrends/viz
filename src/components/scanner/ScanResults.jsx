import React, { useState, useEffect, useContext } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTopVolume } from '../../features/stocksSlice';
import FeedList from './FeedList';

const YAHOO_FINANCE_NEWS_URL = 'https://finance.yahoo.com/quote/';
let socket = null;

const ScanResults = () => {
  const dispatch = useAppDispatch();

  const [stocks, setStocks] = useState([]);
  const [sortedGainers, setSortedGainers] = useState([]);

  useEffect(() => {
    if (!socket) {
      // 7775
      const ws = new WebSocket('ws://www.stockmarketviz.com/scanner');
      socket = ws;
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { sortedGainers, stocks, topGainerList, topVolumeList } = data;
        setSortedGainers(sortedGainers);
        setStocks(stocks);
        dispatch(setTopVolume([...topVolumeList, ...topGainerList]));
        // console.log('data ===>', data);
      };
      // Handle WebSocket errors.
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, []);

  const openLinkInNewTab = (symbol) => {
    const url = `${YAHOO_FINANCE_NEWS_URL}${symbol}/news`;
    window.open(url, '_blank');
  };

  return (
    <div className="">
      <FeedList stocks={stocks}></FeedList>
    </div>
  );
};

export default ScanResults;
