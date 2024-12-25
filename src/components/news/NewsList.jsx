import React from 'react';
import { formatDate } from '../../utils';
import './news.scss';

const NewsList = ({ news }) => {
  const loadNewsInTab = (url) => () => {
    window.open(url, '_blank');
  };
  return (
    <div className="scrollable-list-container">
      <ul className="news-list scrollable-list">
        {news.map((news, index) => (
          <li
            key={news.title}
            className="news-item cursor-pointer scrollable-item"
            onClick={loadNewsInTab(news.article_url)}
          >
            <img
              src={news.image_url}
              alt={`News ${index + 1}`}
              className="news-image"
            />
            <div className="news-content">
              <h3 className="news-title">{news.title}</h3>
              <div className="news-meta">
                <span className="news-date">
                  {formatDate(news.published_utc)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
