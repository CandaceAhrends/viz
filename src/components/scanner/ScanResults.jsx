import React, { useState, useEffect, useContext } from 'react';
import { fetchScanResults } from '../../services';
import { StockContext } from '../../StockContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetStocksQuery, setTopVolume } from '../../features/stocksSlice';

const YAHOO_FINANCE_NEWS_URL = 'https://finance.yahoo.com/quote/';

const ScanResults = () => {
  const dispatch = useAppDispatch();
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  const { bullish } = useAppSelector((state) => state.scanner);
  console.log('bullish ===>', bullish);
  const {
    data = { emaInfo: [] },
    status,
    error,
    refetch,
  } = useGetStocksQuery(
    {},
    {
      pollingInterval: 1000,
    }
  );

  console.log('list from state ===>', data);
  dispatch(
    setTopVolume(data?.emaInfo.map((stock) => stock.ticker).slice(0, 16))
  );
  const openLinkInNewTab = (stock) => {
    const url = `${YAHOO_FINANCE_NEWS_URL}${stock.ticker}/news`;
    window.open(url, '_blank');
  };

  return (
    <ul className="p-0 overflow-y-auto h-[30rem]">
      {data?.emaInfo
        .filter((s) => {
          if (bullish) {
            return s.green;
          } else {
            return !s.green;
          }
        })
        .map((stock) => (
          <li
            key={stock.ticker}
            onClick={() => setSelectedStock(stock.ticker)}
            className={`flex justify-between p-2 hover:bg-[#333] cursor-pointer ${
              selectedStock === stock.ticker
                ? 'text-green-100 border border-green'
                : ''
            }`}
          >
            <div className="min-w-[5rem] flex">
              <p className="text-right text-sm">{stock.ticker}</p>
            </div>
            <div className="min-w-[7rem]">
              <p className="text-slate-500 text-right text-sm">
                {stock.volume.toLocaleString()}
              </p>
            </div>
            <div>
              <button
                className="bg-green-100 text-green-900 px-2 py-1 rounded hover:bg-slate-300"
                onClick={() => openLinkInNewTab(stock)}
              >
                {stock.green ? '🟢' : '🔴'}
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ScanResults;
