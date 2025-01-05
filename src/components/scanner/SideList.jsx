import React, { useState } from 'react';
import { setSelectedStock } from '../../features/historicalDataSlice';
import { setSelectedChart } from '../../features/stocksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import './scanner.scss';

const bulishClass = 'bg-[#2A4037] text-[#07F8B5]';
const bearishClass = 'bg-[#490517] text-[#FF5361]';

const SideList = ({ stocks }) => {
  const dispatch = useAppDispatch();
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const date = useAppSelector((state) => state.stocks.date);
  const selectSideMenuItem = (stock) => {
    dispatch(setSelectedStock(stock));
    dispatch(setSelectedChart({ stock, date }));
  };

  return (
    <ul className="flex flex-col pt-5  ">
      {stocks.map((stock) => (
        <li
          key={stock?.symbol}
          className="flex pl-3 content-center hover:border-l cursor-pointer text-center"
          onClick={() => selectSideMenuItem(stock)}
        >
          <div
            className={`text-xl font-bold ${
              selectedStock.symbol === stock.symbol ? 'text-green' : ''
            }`}
          >
            {stock.symbol}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideList;
