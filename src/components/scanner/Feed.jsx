import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilteredStocks } from '../../features/historicalDataSlice';
import { useListScanStocksQuery } from '../../features/scannerApiSlice';
import { filterScannerResults } from '../../utils';
import NewsHeader from './NewsHeader';
import FeedList from './FeedList';
import LoadingFallback from '../shared/LoadingFallback';

const Feed = () => {
  const dispatch = useAppDispatch();
  const scanConfig = useAppSelector((state) => state.scanner.config);
  const [scanResults, setScanResults] = React.useState([]);
  const [filteredByScan, setFilteredByScan] = React.useState([]);
  const date = useAppSelector((state) => state.stocks.date);
  const [page, setPage] = React.useState(1);
  const {
    data = [],
    error,
    isLoading,
  } = useListScanStocksQuery({ date, page });

  useEffect(() => {
    if (data && !isLoading) {
      setScanResults([...scanResults, ...data?.stocks]);
    }
  }, [data]);

  useEffect(() => {
    if (scanResults.length) {
      const updatedStocks = scanResults.filter(
        filterScannerResults(scanConfig)
      );
      setFilteredByScan(updatedStocks);
      dispatch(setFilteredStocks(updatedStocks));
    }
  }, [scanConfig, scanResults]);

  return (
    <div>
      <NewsHeader stocks={filteredByScan} />
      {isLoading ? (
        <LoadingFallback />
      ) : (
        <div>
          <FeedList stocks={filteredByScan} setPage={setPage}></FeedList>
        </div>
      )}
    </div>
  );
};

export default Feed;
