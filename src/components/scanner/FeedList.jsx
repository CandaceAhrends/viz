import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import { setSelectedStock } from '../../features/historicalDataSlice';
import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5] rounded p-1 w-50';
const bearishClass = 'bg-[#490517] text-[#FF5361] rounded p-1 w-50';

const FeedList = ({ stocks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const computeStockGainPercentageFromOpen = (stock) => {
    const percentChange = ((stock.close - stock.open) / stock.open) * 100;
    if (stock.open > stock.close) {
      return (
        <span className={` text-lg ${bearishClass}`}>
          {percentChange.toFixed(2)}%
        </span>
      );
    } else {
      return (
        <span className={`text-lg ${bulishClass}`}>
          {percentChange.toFixed(2)}%
        </span>
      );
    }
  };

  const handleStockClick = (stock) => {
    dispatch(setSelectedStock(stock));
    navigate('/news');
  };

  return (
    <div className="ml-1 md:m-3 mr-1">
      <div className="stock-list">
        <div className="stock-list__header">
          <div className="column">Symbol</div>
          <div className="column">Volume</div>
          <div className="column">Price</div>
          <div className="column">% Change</div>
        </div>
        <ul className="stock-list__body">
          {stocks.map((stock, index) => (
            <li
              className="stock-list__item"
              key={stock.symbol}
              onClick={() => handleStockClick(stock)}
            >
              <div className="column">{stock.symbol}</div>
              <div className="column text-slate-400">
                {stock.volume.toLocaleString()}
              </div>
              <div className="column">{stock.vw}</div>
              <div
                className={`column ${
                  stock.isPositive ? 'positive' : 'negative'
                }`}
              >
                {computeStockGainPercentageFromOpen(stock)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedList;
