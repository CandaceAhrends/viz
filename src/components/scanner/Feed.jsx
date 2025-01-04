import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilteredStocks } from '../../features/historicalDataSlice';
import FeedList from './FeedList';

const Feed = () => {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.historicalData.topVolume);
  const scanConfig = useAppSelector((state) => state.scanner.config);
  const [scanResults, setScanResults] = React.useState([]);

  useEffect(() => {
    if (stocks) {
      const filteredStocks = stocks.filter((stock) => {
        return stock.vw >= scanConfig.min && stock.vw <= scanConfig.max;
      });
      dispatch(setFilteredStocks(filteredStocks));
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
