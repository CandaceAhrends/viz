import React, { useEffect } from 'react';
import { fetchCurrentTiingoNews } from '../../services';
import TiingoNewsList from './TiingoNewsList';

const AllNews = () => {
  const [news, setNews] = React.useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchCurrentTiingoNews();
      setNews(news);
    };

    loadNews();
  }, []);

  return (
    <div>
      <TiingoNewsList news={news} />
    </div>
  );
};

export default AllNews;
