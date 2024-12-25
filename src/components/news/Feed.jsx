import React, { useState, useContext, useEffect } from 'react';
import { StockContext } from '../../StockContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNews } from '../../services';
import { formatDate } from '../../utils';
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
    <ul
      className={`${
        isScannerOpen ? 'md:w-[30%] lg:w-[47%]' : 'max-w-full'
      }  p-0 overflow-y-auto mt-5 h-[calc(100dvh-20rem)] md:h-[calc(100vh-38rem)]`}
    >
      <NewsList news={news} />
    </ul>
  );
};

export default Feed;
