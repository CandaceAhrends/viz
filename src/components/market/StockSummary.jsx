import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './market.scss';

const summaryColors = ['blue', 'purple', 'orange'];

const StockSummary = ({ summaryStocks }) => {
  const [stocks, setStocks] = React.useState([]);
  const animate = useAppSelector((state) => state.stocks.animate);

  useEffect(() => {
    if (summaryStocks) {
      const updatedStocks = summaryStocks.map((stock, index) => {
        const change = stock.diff;

        return {
          name: stock.symbol,
          price: stock.vw.toFixed(2),
          change: `${change.toFixed(2)}`,
          percent: stock.percent.toFixed(2) + '%',
          color: summaryColors[index],
          isPositive: stock.isPositive,
        };
      });
      setStocks(updatedStocks);
    }
  }, [summaryStocks]);

  return (
    <div className="stock-summary   md:w-[85%] lg:w-full">
      {stocks.map((stock, index) => (
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
