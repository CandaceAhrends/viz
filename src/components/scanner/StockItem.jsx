import React from 'react';
import { setSelectedStock } from '../../features/historicalDataSlice';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5] rounded p-1 w-50';
const bearishClass = 'bg-[#490517] text-[#FF5361] rounded p-1 w-50';

const StockItem = ({ stock }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  return (
    <div>
      <li
        className="stock-list__item"
        key={stock.symbol}
        onClick={() => handleStockClick(stock)}
      >
        <div className="column">{stock.symbol}</div>
        <div className="column text-slate-400">
          {stock.volume.toLocaleString()}
        </div>
        <div className="column">{stock.vw?.toFixed(2)}</div>
        <div className={`column ${stock.isPositive ? 'positive' : 'negative'}`}>
          {stock?.percent && computeStockGainPercentageFromOpen(stock)}
        </div>
      </li>
    </div>
  );
};

export default StockItem;
