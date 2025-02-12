import React from 'react';

import './market.scss';

const StockSummary = ({ summaryStocks }) => {
  return (
    <div className="stock-summary   md:w-[85%] lg:w-full">
      {summaryStocks.map((stock, index) => (
        <div
          key={stock.name}
          className={`stock ${stock.isPositive ? 'positive' : 'negative'}`}
        >
          <div className={`indicator ${stock.color}`}></div>
          <div className="details">
            <span className="name">{stock.name}</span>
            <span className="price">{stock.price}</span>
          </div>
          <div
            className={`change ${stock.isPositive ? 'positive' : 'negative'}`}
          >
            <span className="text-sm">{stock.change}</span>
            <span className="text-sm">{stock.percent}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockSummary;
