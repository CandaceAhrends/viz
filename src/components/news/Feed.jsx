import React, { useState, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNews } from '../../services';
import NewsList from './NewsList';

const Feed = ({ containerRef, size }) => {
  const [news, setNews] = useState([]);
  const selectedDate = useAppSelector((state) => state.stocks.date);
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchNews({
          symbol: selectedStock.symbol,
          date: selectedDate,
        });
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    if (selectedStock) {
      fetch();
    }
  }, [selectedStock]);

  return (
    <div
      className={`scrollable-list-container ${
        size === 'sm' ? 'scrolled-up' : ''
      }`}
      ref={containerRef}
    >
      {selectedStock ? (
        <NewsList news={news} />
      ) : (
        <div className="text-center text-2xl text-white">
          Select a valid market date to view news.
        </div>
      )}
    </div>
  );
};

export default Feed;
