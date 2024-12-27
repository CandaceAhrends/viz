import React, { useContext } from 'react';
import { StockContext } from '../../StockContext';
import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5]';
const bearishClass = 'bg-[#490517] text-[#FF5361]';

const SideList = ({ stocks }) => {
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  return (
    <ul className="flex flex-col pt-5  ">
      {stocks.map((stock) => (
        <li
          key={stock?.ticker}
          className="flex pl-3 content-center hover:border-l cursor-pointer text-center"
          onClick={() => setSelectedStock(stock.ticker)}
        >
          <div
            className={`text-xl font-bold ${
              selectedStock === stock.ticker ? 'text-green' : ''
            }`}
          >
            {stock.ticker}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideList;
