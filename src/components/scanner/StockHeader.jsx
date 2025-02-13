import React, { useEffect, useState } from 'react';

const StockHeader = ({ stocks, setSortedStocks }) => {
  const [sortPercentChangeAscending, setSortPercentChangeAscending] =
    useState(false);
  const [sortVolumeAscending, setSortVolumeAscending] = useState(false);

  useEffect(() => {
    setSortedStocks([...stocks]);
  }, [stocks]);

  const sortByPercentChange = () => {
    setSortPercentChangeAscending(!sortPercentChangeAscending);
    const sortedByPercentChange = stocks.sort((a, b) => {
      return sortPercentChangeAscending
        ? a.percent - b.percent
        : b.percent - a.percent;
    });
    setSortedStocks([...sortedByPercentChange]);
  };
  const sortByVolume = () => {
    setSortVolumeAscending(!sortVolumeAscending);
    const sortedByVolume = stocks.sort((a, b) =>
      sortVolumeAscending ? a.volume - b.volume : b.volume - a.volume
    );
    setSortedStocks([...sortedByVolume]);
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
