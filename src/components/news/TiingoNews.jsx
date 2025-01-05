import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTiingoNews } from '../../services';
import { formatDate } from '../../utils';
import './news.scss';

const TiingoNews = () => {
  const location = useLocation();
  const symbols = location.state;
  const [news, setNews] = React.useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const news = await fetchTiingoNews({ symbols });
      setNews(news);
    };

    if (symbols) {
      loadNews({ symbols });
    }
  }, [symbols]);

  return (
    <div className="scrollable-tiingo-news-container flex m-auto w-[90%] md:w-[80%]">
      {symbols ? (
        <ul className="news-list scrollable-list">
          {news.map((news, index) => (
            <li
              key={news.id}
              className="news-item cursor-pointer scrollable-item"
              onClick={() => window.open(news.url, '_blank')}
            >
              <div className="news-content">
                <h3 className="news-title">{news.title}</h3>
                <div className="news-meta">
                  <span className="news-date">
                    {formatDate(news.publishedDate)}
                  </span>
                </div>
                <div>
                  {news.tickers
                    .filter((ticker) => symbols.includes(ticker))
                    .map((s) => (
                      <span
                        key={`${news.title.slice(0, 20)}${s}`}
                        className="p-1 text-brand-blue"
                      >
                        {s.toUpperCase()}
                      </span>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-news">No news available</div>
      )}
    </div>
  );
};

export default TiingoNews;
