import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FeedList from './FeedList';

const Feed = ({ scanConfig }) => {
  const stocks = useAppSelector((state) => state.historicalData.topVolume);
  const [scanResults, setScanResults] = React.useState([]);

  useEffect(() => {
    if (stocks) {
      const filteredStocks = stocks.filter((stock) => {
        return stock.vw >= scanConfig.min && stock.vw <= scanConfig.max;
      });
      setScanResults([...filteredStocks]);
    }
  }, [scanConfig, stocks]);

  return (
    <div>
      <FeedList stocks={scanResults}></FeedList>
    </div>
  );
};

export default Feed;
