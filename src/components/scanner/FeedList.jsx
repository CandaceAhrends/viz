import React, { useRef, useEffect, useState } from 'react';
import StockHeader from './StockHeader';
import StockItem from './StockItem';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './scanner.scss';

const FeedList = ({ stocks }) => {
  const containerRef = useRef(null);
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [observerRef, rootRef, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      console.log('isIntersecting');
    }
  }, [isIntersecting]);

  return (
    <div className="ml-1 md:m-3 mr-1">
      <div className="stock-list">
        <StockHeader stocks={stocks} setSortedStocks={setSortedStocks} />
        <ul className="stock-list__body">
          {sortedStocks.map((stock, idx) => (
            <>
              <StockItem stock={stock} key={stock.symbol} />
              {stocks.length - 10 === idx && <div ref={rootRef}></div>}
            </>
          ))}
        </ul>
        <div ref={observerRef} className="intersection-observer"></div>
      </div>
    </div>
  );
};

export default FeedList;
