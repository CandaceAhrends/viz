import React, { useEffect, useState } from 'react';
import { setConfig } from '../../features/scannerSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const StockHeader = ({ stocks, setSortedStocks }) => {
  const dispatch = useAppDispatch();
  const [sortPercentChangeAscending, setSortPercentChangeAscending] =
    useState(false);
  const [sortVolumeAscending, setSortVolumeAscending] = useState(false);
  const scanConfig = useAppSelector((state) => state.scanner.config);
  useEffect(() => {
    setSortedStocks([...stocks]);
  }, [stocks]);

  const sortByPercentChange = () => {
    setSortPercentChangeAscending(!sortPercentChangeAscending);
    dispatch(
      setConfig({
        sortType: 'percent',
        sortOrder: sortPercentChangeAscending ? 'asc' : 'desc',
      })
    );
  };
  const sortByVolume = () => {
    setSortVolumeAscending(!sortVolumeAscending);
    dispatch(
      setConfig({
        sortType: 'volume',
        sortOrder: sortVolumeAscending ? 'asc' : 'desc',
      })
    );
  };

  return (
    <div className="stock-list__header">
      <div className="column">Symbol</div>
      <div
        className="column hover:text-brand-blue hover:cursor-pointer"
        onClick={sortByVolume}
      >
        Volume<span className="sort-icon">⇅</span>
      </div>
      <div className="column">Price</div>
      <div
        className="column hover:text-brand-blue hover:cursor-pointer"
        onClick={sortByPercentChange}
      >
        % Change<span className="sort-icon">⇅</span>
      </div>
    </div>
  );
};

export default StockHeader;
