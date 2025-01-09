import React from 'react';
import { Link } from 'react-router-dom';
import { selectMenu } from '../../features/navigationSlice';
import { useNavigate } from 'react-router-dom';
import Banner from '../market/Banner';
import Header from '../market/Header';
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

  const loadLatestnews = () => {
    navigate('allnews');
    dispatch(selectMenu('news'));
  };

  return (
    <div>
      <Header></Header>
      {hasError && (
        <ErrorMessage message="Historical data is not available for this date." />
      )}
      {!hasError && (
        <SuccessMessage>
          <Link to="/news" onClick={() => dispatch(selectMenu('news'))}>
            <Banner selectedDate={date} />
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
