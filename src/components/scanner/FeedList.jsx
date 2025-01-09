import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import { setSelectedStock } from '../../features/historicalDataSlice';
import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5] rounded p-1 w-50';
const bearishClass = 'bg-[#490517] text-[#FF5361] rounded p-1 w-50';

const FeedList = ({ stocks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [sortPercentChagneAscending, setSortPercentChangeAscending] =
    useState(false);
  const [sortVolumeAscending, setSortVolumeAscending] = useState(false);

  useEffect(() => {
    setSortedStocks([...stocks]);
  }, [stocks]);

  const computeStockGainPercentageFromOpen = (stock) => {
    if (!stock.isPositive) {
      return (
        <span className={` text-lg ${bearishClass}`}>
          {stock.percent.toFixed(2)}%
        </span>
      );
    } else {
      return (
        <span className={`text-lg ${bulishClass}`}>
          {stock.percent.toFixed(2)}%
        </span>
      );
    }
  };

  const handleStockClick = (stock) => {
    dispatch(setSelectedStock(stock));
    navigate('/news');
  };
  const sortByPercentChange = () => {
    setSortPercentChangeAscending(!sortPercentChagneAscending);
    const sortedByPercentChange = stocks.sort((a, b) => {
      return sortPercentChagneAscending
        ? a.percent - b.percent
        : b.percent - a.percent;
    });
    setSortedStocks([...sortedByPercentChange]);
  };
  const sortByVolume = () => {
    setSortVolumeAscending(!sortVolumeAscending);
    const sortedByVolume = stocks.sort((a, b) =>
      sortVolumeAscending ? a.volume - b.volume : b.volume - a.volume
    );
    setSortedStocks([...sortedByVolume]);
  };

  return (
    <div className="ml-1 md:m-3 mr-1">
      <div className="stock-list">
        <div className="stock-list__header">
          <div className="column">Symbol</div>
          <div
            className="column hover:text-brand-blue hover:cursor-pointer"
            onClick={sortByVolume}
          >
            Volume<span className="sort-icon">⇅</span>
          </div>
          <div className="column">Price</div>
          <div
            className="column hover:text-brand-blue hover:cursor-pointer"
            onClick={sortByPercentChange}
          >
            % Change<span className="sort-icon">⇅</span>
          </div>
        </div>
        <ul className="stock-list__body">
          {sortedStocks.map((stock, index) => (
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
                {stock?.percent && computeStockGainPercentageFromOpen(stock)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedList;
