import React, { useContext, useState } from 'react';
import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5]';
const bearishClass = 'bg-[#490517] text-[#FF5361]';

const FeedList = ({ stocks }) => {
  const { selectedStock, setSelectedStock } = useState('QQQ');

  const computeStockGainPercentageFromOpen = (stock) => {
    const percentChange = ((stock.close - stock.open) / stock.open) * 100;
    if (stock.open > stock.close) {
      return (
        <li className={` text-lg ${bearishClass}`}>
          {percentChange.toFixed(2)}%
        </li>
      );
    } else {
      return (
        <li className={`text-lg ${bulishClass}`}>
          {percentChange.toFixed(2)}%
        </li>
      );
    }
  };

  return (
    <div className="ml-5 md:m-5 mr-3">
      <header className="flex items-center justify-between h-[7rem]">
        <div className="text-xl font-bold w-[30rem] md:w-[20rem]">Markets</div>
        <div className="flex  ml-auto">
          <button className="text-lg button selected">Active</button>
          {/* <button className="text-lg button">Gainers</button> */}
        </div>
      </header>
      <div className="scrollable-scan-list-container">
        {stocks.map((stock) => (
          <ul
            key={stock?.symbol}
            className="flex items-center justify-between h-10 min-h-10"
            onClick={() => setSelectedStock(stock.symbol)}
          >
            <li className="flex ext-white w-[5rem] md:w-[10rem] hover:border-l cursor-pointer ">
              <div
                className={`text-xl font-bold ${
                  selectedStock === stock.symbol ? 'text-green' : ''
                }`}
              >
                {stock.symbol}
              </div>
            </li>

            <li className="w-12  text-gray-400 text-lg">
              {stock.volume?.toLocaleString()}
            </li>
            <li className="flex  ">
              <div className="ml-auto flex-end text-left  ">
                {computeStockGainPercentageFromOpen(stock)}
              </div>
            </li>
            <li className="text-gray-400 text-lg">{stock.vw?.toFixed(2)}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FeedList;
