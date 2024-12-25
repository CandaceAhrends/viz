import React, { useState, useContext, useEffect } from 'react';
import { StockContext } from '../../StockContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNews } from '../../services';
import NewsList from './NewsList';

const Feed = () => {
  const [news, setNews] = useState([]);
  const { selectedStock } = useContext(StockContext);
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchNews(selectedStock);
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
    <div className="scrollable-list-container">
      <NewsList news={news} />
    </div>
  );
};

export default Feed;
