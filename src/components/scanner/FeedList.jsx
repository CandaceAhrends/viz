import React, { useContext, useEffect, useState } from 'react';
import StockHeader from './StockHeader';
import StockItem from './StockItem';

import './scanner.scss';

const FeedList = ({ stocks }) => {
  const [sortedStocks, setSortedStocks] = useState(stocks);

  return (
    <div className="ml-1 md:m-3 mr-1">
      <div className="stock-list">
        <StockHeader stocks={stocks} setSortedStocks={setSortedStocks} />
        <ul className="stock-list__body">
          {sortedStocks.map((stock) => (
            <StockItem stock={stock} key={stock.symbol} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedList;
