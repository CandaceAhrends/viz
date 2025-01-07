import React from 'react';
import { formatDate } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { setSelectedChart } from '../../features/stocksSlice';
import { selectMenu } from '../../features/navigationSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './news.scss';

const NewsList = ({ news, symbol }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadNewsInTab = (url) => () => {
    window.open(url, '_blank');
  };
  const explore = (e, news) => {
    e.stopPropagation();
    e.preventDefault();
    const articleDate = dayjs(news.published_utc).format('YYYY-MM-DD');
    dispatch(setSelectedChart({ date: articleDate, stock: { symbol } }));
    navigate('/charts', { state: news });
    dispatch(selectMenu('charts'));
  };

  const getDescription = (news) => {
    return `Explore ${symbol} chart on ${dayjs(news.published_utc).format(
      'MMM DD, YYYY'
    )}`;
  };
  return (
    <div className="scrollable-list-container">
      <ul className="news-list scrollable-list">
        {news.map((news, index) => (
          <li
            key={news.published_utc}
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

            <div
              className="chart-icon"
              data-description={getDescription(news)}
              onClick={(e) => explore(e, news)}
            >
              <div className="bar red"></div>
              <div className="bar orange"></div>
              <div className="bar green"></div>
              <div className="bar teal"></div>
              <div className="arrow"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
