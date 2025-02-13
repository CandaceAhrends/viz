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
  const date = useAppSelector((state) => state.stocks.date);
  const [page, setPage] = React.useState(1);
  const {
    data = [],
    error,
    isLoading,
  } = useListScanStocksQuery({ date, page });

  useEffect(() => {
    if (data && !isLoading) {
      const filteredStocks = data?.stocks.filter(
        filterScannerResults(scanConfig)
      );
      dispatch(setFilteredStocks(filteredStocks));
      setScanResults([...filteredStocks]);
    }
  }, [scanConfig, data]);

  return (
    <div>
      <NewsHeader scanResults={scanResults} />
      {isLoading ? (
        <LoadingFallback />
      ) : (
        <div>
          <FeedList stocks={scanResults}></FeedList>
        </div>
      )}
    </div>
  );
};

export default Feed;
