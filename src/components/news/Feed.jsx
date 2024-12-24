import React, { useState, useContext, useEffect } from 'react';
import { StockContext } from '../../StockContext';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNews } from '../../services';
import { formatDate } from '../../utils';

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
      }  p-0 overflow-y-auto h-[30rem] mt-10 z-1 h-[calc(100vh-25rem)] md:h-[calc(100vh-38rem)]`}
    >
      {news.map((item) => (
        <li key={item.id} className="flex pb-5">
          <div className="md:hidden text-sm md:mr-10 lg:mr-0 text-green min-w-[7rem] lg:block pl-5">
            {formatDate(item.published_utc)}
          </div>
          <div className="text-slate-300 text-sm pl-1 lg:ml-0">
            {item.description}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Feed;
