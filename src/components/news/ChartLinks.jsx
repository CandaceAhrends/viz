import React, { useEffect, useState } from 'react';
import StockData from '../ticker/StockData.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import {
  selectNextSymbol,
  selectPrevSymbol,
} from '../../features/historicalDataSlice.ts';
import { setSelectedChart } from '../../features/stocksSlice.ts';
import { selectMenu } from '../../features/navigationSlice.ts';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowSvg from '../images/ArrowSvg.jsx';
import './news.scss';

const ChartLinks = ({ shrink }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState({ prev: true, next: false });
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const date = useAppSelector((state) => state.stocks.date);
  const filteredStocks = useAppSelector(
    (state) => state.historicalData.filteredStocks
  );

  useEffect(() => {
    const nextBtnDisabled = filteredStocks.length <= 1;
    const prevBtnDisabled = filteredStocks.length <= 1;
    setIsDisabled({ prev: prevBtnDisabled, next: nextBtnDisabled });
  }, [filteredStocks]);
  const selectNextStock = () => {
    if (isDisabled.next) return;
    dispatch(selectNextSymbol());
  };
  const selectPrevStock = () => {
    if (isDisabled.prev) return;
    dispatch(selectPrevSymbol());
  };
  const loadSelectedChart = () => {
    dispatch(setSelectedChart({ stock: selectedStock, date }));
    navigate('/charts');
    dispatch(selectMenu('charts'));
  };

  return (
    <div className="flex">
      <div
        className={`${shrink === 'sm' ? 'flex' : ''}`}
        onClick={loadSelectedChart}
      >
        <StockData shrink={shrink} />
        {shrink === 'sm' && (
          <div className="p-1  z-[999999]">
            <Link to={'/charts'}>
              <ArrowSvg />
            </Link>
          </div>
        )}
        <div className="flex mt-1">
          {shrink === 'lg' && (
            <span className="lg-icon pl-3">
              <Link to={'/charts'}>
                <ArrowSvg />
              </Link>
            </span>
          )}
        </div>
      </div>
      <div className="flex button-group hover:pointer">
        <button
          className={`button prev ${isDisabled.prev ? 'disabled' : ''}`}
          onClick={selectPrevStock}
        >
          <span className="icon">◀</span>
          <span className="text">PREV</span>
        </button>
        <button
          className={`button next ${isDisabled.next ? 'disabled' : ''}`}
          onClick={selectNextStock}
        >
          <span className="text">NEXT</span>
          <span className="icon">▶</span>
        </button>
      </div>
    </div>
  );
};

export default ChartLinks;
