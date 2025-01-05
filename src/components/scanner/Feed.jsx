import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilteredStocks } from '../../features/historicalDataSlice';
import { isOnOrAfterLastMarketDate, buildTiingoStocklist } from '../../utils';
import { useNavigate } from 'react-router-dom';
import ViewSvg from '../images/ViewSvg';
import FeedList from './FeedList';

const Feed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const showFilteredStockNews = async () => {
    const symbols = buildTiingoStocklist(
      scanResults.map((stock) => stock.symbol)
    );
    navigate('/tiingo', { state: symbols });
  };

  return (
    <div>
      <div
        className="flex  hover:cursor-pointer pl-3 pt-3"
        onClick={showFilteredStockNews}
      >
        <div className="view-all-button">
          <ViewSvg />

          <span className="text ml-1">
            <span className="text-green">Current</span> News
          </span>
        </div>
      </div>

      <FeedList stocks={scanResults}></FeedList>
    </div>
  );
};

export default Feed;
