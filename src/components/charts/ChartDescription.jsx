import React, { useEffect } from 'react';
import { formatDateTime } from '../../utils';
import { fetchStockDescription } from '../../services';
import './charts.scss';

const ChartDescription = ({ news, symbol }) => {
  const [description, setDescription] = React.useState([]);
  useEffect(() => {
    const loadDescription = async () => {
      const description = await fetchStockDescription(symbol);
      setDescription(description.results);
    };

    if (news) {
      loadDescription();
    }
  }, [symbol]);

  useEffect(() => {
    document.querySelector('aside').style.display = 'none';
  }, []);

  return (
    <div>
      {description && (
        <div className="flex flex-col m-10 chart-desc">
          <div className="text-green">
            {formatDateTime(news.published_utc)}
            <div>{news.title}</div>
          </div>
          <ul>
            <li>{description.name}</li>
            <li>{description.primary_exchange}</li>
            <li>{description.description}</li>
            <li>{description.sic_description}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChartDescription;
