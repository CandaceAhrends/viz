import React, { useContext } from 'react';
import { StockContext } from '../../StockContext';
import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5]';
const bearishClass = 'bg-[#490517] text-[#FF5361]';

const FeedList = ({ stocks }) => {
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  return (
    <div className="ml-5 md:m-5 mr-3">
      <header className="flex items-center justify-between h-[7rem]">
        <div className="text-xl font-bold w-[30rem] md:w-[20rem]">Markets</div>
        <div className="flex  ml-auto">
          <button className="text-lg button selected">Active</button>
          <button className="text-lg button">Gainers</button>
        </div>
      </header>
      <div className="scrollable-scan-list-container">
        {stocks.map((stock) => (
          <ul
            key={stock?.ticker}
            className="flex items-center justify-between h-10 min-h-10"
            onClick={() => setSelectedStock(stock.ticker)}
          >
            <li className="flex ext-white w-[5rem] md:w-[10rem] hover:border-l cursor-pointer ">
              <div
                className={`text-xl font-bold ${
                  selectedStock === stock.ticker ? 'text-green' : ''
                }`}
              >
                {stock.ticker}
              </div>
            </li>

            <li className="w-12 text-gray-400 text-lg">
              {stock.volume.toLocaleString()}
            </li>
            <div className="flex space-x-4">
              <li className="ml-auto flex-end text-left  pl-[1rem] w-[100%]">
                <span
                  className={`${
                    stock.ticker === 'BA' ? bearishClass : bulishClass
                  } rounded-full p-[.3rem] pl-8 pr-8 text-center`}
                >
                  {(Math.random() * 10).toFixed(2)}%
                </span>
              </li>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FeedList;
