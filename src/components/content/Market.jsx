import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectMenu } from '../../features/navigationSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StockSummary from '../ticker/StockSummary';
import ErrorMessage from '../shared/ErrorMessage';
import SuccessMessage from '../shared/SuccessMessage';
import StockDatePicker from '../market/StockDatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '@material-tailwind/react';
import './content.scss';

const Market = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = useAppSelector((state) => state.stocks.date);
  const hasError = useAppSelector((state) => state.historicalData.hasError);
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

  const loadLatestnews = () => {
    navigate('allnews');
    dispatch(selectMenu('news'));
  };

  return (
    <div>
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
      {hasError && (
        <ErrorMessage message="Historical data is not available for this date." />
      )}
      {!hasError && (
        <SuccessMessage>
          <Link to="/news" onClick={() => dispatch(selectMenu('news'))}>
            <div className="flex items-center align-center text-brand-blue">
              <span className="mr-1">
                {dayjs(date).format('MMMM DD, YYYY')} News{' '}
              </span>
              <svg
                className="h-4 w-4 text-sky-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />{' '}
                <polyline points="15 3 21 3 21 9" />{' '}
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </Link>
          <div className="flex ml-4">
            <Button size="sm" color="blue" onClick={loadLatestnews}>
              Latest
            </Button>
          </div>
        </SuccessMessage>
      )}

      <div className="description">
        <h2>Historical Market Scanner</h2>
      </div>
      <div className="flex justify-center h-[30rem]">
        <StockDatePicker />
      </div>
      <div className="flex justify-center">
        <Link to="/news" onClick={() => dispatch(selectMenu('news'))}>
          <button className="m-auto w-[7rem] mr-5 mb-5 rounded h-[3rem] bg-[#07f8b5] text-black hover:bg-[#43907a]">
            News
          </button>
        </Link>

        <Link to="/scan" onClick={() => dispatch(selectMenu('scan'))}>
          <button className="m-auto w-[7rem] mr-5 mb-5 rounded h-[3rem] bg-[#07f8b5] text-black hover:bg-[#43907a]">
            Scanner
          </button>
        </Link>

        <Link to="/charts" onClick={() => dispatch(selectMenu('charts'))}>
          <button className="m-auto w-[7rem] mr-5 mb-5 rounded h-[3rem] bg-[#07f8b5] text-black hover:bg-[#43907a]">
            Charts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Market;
