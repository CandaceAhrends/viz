import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectMenu } from '../../features/navigationSlice';
import { setDate } from '../../features/stocksSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StockSummary from '../ticker/StockSummary';
import ErrorMessage from '../shared/ErrorMessage';
import SuccessMessage from '../shared/SuccessMessage';
import StockDatePicker from '../shared/StockDatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button } from '@material-tailwind/react';

import './content.scss';

const Page = () => {
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
  const [selectedDate, setSelectedDate] = React.useState(null);

  const updateMarketDate = (date) => {
    const dayjsDate = dayjs(date);
    dispatch(setDate(dayjsDate.format('YYYY-MM-DD')));
  };
  const handleDate = (date) => {
    setSelectedDate(date);
    updateMarketDate(date);
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(dayjs(date)));
    }
  }, [date]);

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
            <span className="text-brand-blue">
              {dayjs(date).format('MMMM DD, YYYY')} News or
            </span>
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
        <p>Research the most active stocks based on the selected date. </p>
      </div>
      <div className="flex justify-center h-[30rem]">
        <StockDatePicker
          selectedDate={selectedDate}
          setSelectedDate={handleDate}
        />
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

export default Page;
