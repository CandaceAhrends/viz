import React, { useState, useContext, useEffect } from 'react';
import { StockContext } from '../../StockContext';
import { fetchNews } from '../../services';
import { formatDate } from '../../utils';

const Feed = () => {
  const [news, setNews] = useState([]);
  const { selectedStock } = useContext(StockContext);

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
    <ul className="max-w-[80%] divide-y divide-gray-200 p-0 overflow-y-auto h-[30rem]">
      {news.map((item) => (
        <li key={item.id} className="flex pb-5">
          <div className="w-[15rem] mr-10 text-green">
            {formatDate(item.published_utc)}
          </div>
          <div className="text-slate-300 text-sm w-[50rem]">
            {item.description}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Feed;
