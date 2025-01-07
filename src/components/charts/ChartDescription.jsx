import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { fetchStockDescription } from '../../services';

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

  return (
    <div>
      {news && (
        <div className="flex flex-col m-10">
          <div className="text-green">
            {dayjs(news.published_utc).format('MMM DD YYYY HH:mm a')}
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
