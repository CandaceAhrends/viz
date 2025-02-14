import React from 'react';
import ViewSvg from '../images/ViewSvg';
import { useAppDispatch } from '../../hooks';
import { selectMenu } from '../../features/navigationSlice';
import { buildTiingoStocklist } from '../../utils';
import { useNavigate } from 'react-router-dom';

const NewsHeader = ({ stocks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showFilteredStockNews = async () => {
    const symbols = buildTiingoStocklist(stocks.map((stock) => stock.symbol));
    dispatch(selectMenu('news'));
    navigate('/tiingo', { state: symbols });
  };

  return (
    <div className="flex">
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
    </div>
  );
};
export default NewsHeader;
