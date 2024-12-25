import React from 'react';
import { formatDate } from '../../utils';
import './news.scss';

const NewsList = ({ news }) => {
  const loadNewsInTab = (url) => () => {
    window.open(url, '_blank');
  };
  return (
    <ul className="news-list">
      {news.map((news, index) => (
        <li
          key={index}
          className="news-item cursor-pointer"
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
  );
};

export default NewsList;
