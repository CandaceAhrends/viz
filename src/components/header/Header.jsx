import React, { useContext } from 'react';
import SideMenu from '../navigation/SideMenu';
import HamIconToggle from '../navigation/HamIconToggle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import dayjs from 'dayjs';
import './header.scss';

const Header = () => {
  const selectedStockDate = dayjs(useAppSelector((state) => state.stocks.date));
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );
  const selectedMenu = useAppSelector((state) => state.navigation.selectedMenu);

  return (
    <header className="text-white h-[40px]  mt-1  border-b border-neutral-900 ">
      <div className="flex justify-center text-green ">
        <div className="stock-display text-sm">
          <span className="stock-symbol">{selectedStock?.symbol}</span>

          <span className="stock-change">
            {selectedStockDate.format('dddd, MMMM D, YYYY')}
          </span>
        </div>
      </div>
      <div className="flex justify-end w-full p-1 mr-5 mt-[-1.2rem] z-[999999]">
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
