import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import StockSummary from './StockSummary';
import './market.scss';

const Header = () => {
  const [summaryStocks, setSummaryStocks] = React.useState([]);
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const marketSummary = useAppSelector(
    (state) => state.historicalData.marketSummary
  );
  useEffect(() => {
    if (marketSummary) {
      setSummaryStocks([...marketSummary, selectedStock]);
    }
  }, [selectedStock]);

  return (
    <header className="w-[27rem] md:w-[30rem] m-auto">
      <div className="header">
        <h1>
          Stockmarket<span>viz</span>
        </h1>
      </div>

      <div className="flex justify-center">
        {summaryStocks?.length > 1 && (
          <StockSummary summaryStocks={summaryStocks} />
        )}
      </div>
    </header>
  );
};

export default Header;
