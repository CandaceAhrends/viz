import React, { useRef, useEffect, useState } from 'react';
import StockHeader from './StockHeader';
import StockItem from './StockItem';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './scanner.scss';

const FeedList = ({ stocks, setPage }) => {
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [observerRef, isIntersecting] = useIntersectionObserver({
    trigger: sortedStocks,
  });

  useEffect(() => {
    if (isIntersecting) {
      setPage((prev) => (prev < 8 ? prev + 1 : prev));
    }
  }, [isIntersecting]);

  return (
    <div className="ml-1 md:m-3 mr-1">
      <div className="stock-list">
        <StockHeader stocks={stocks} setSortedStocks={setSortedStocks} />
        {sortedStocks.length}--len
        <ul className="stock-list__body">
          {sortedStocks.map((stock, idx) => (
            <>
              {sortedStocks.length - 1 === idx && (
                <div
                  style={{
                    height: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  ref={observerRef}
                ></div>
              )}
              <StockItem stock={stock} key={stock.symbol} />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedList;
