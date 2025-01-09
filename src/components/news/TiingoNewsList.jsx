import React from 'react';
import { formatDateTime } from '../../utils';

const TiingoNewsList = ({ news, symbols }) => {
  return (
    <div className="scrollable-tiingo-news-container flex m-auto w-[90%] md:w-[80%]">
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
                  {formatDateTime(news.publishedDate)}
                </span>
              </div>
              <div>
                {symbols &&
                  news.tickers
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
    </div>
  );
};

export default TiingoNewsList;
