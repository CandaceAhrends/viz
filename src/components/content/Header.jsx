import React, { useContext } from 'react';
import SideMenu from '../navigation/SideMenu';
import { StockContext } from '../../StockContext';
import HamIconToggle from './HamIconToggle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './content.scss';

const Header = () => {
  const { selectedStock, selectedQuote } = useContext(StockContext);

  const selectedMenu = useAppSelector((state) => state.navigation.selectedMenu);

  return (
    <header className="text-white h-[40px]  mt-1  border-b border-neutral-900 ">
      <div className="flex justify-center text-green ">
        {selectedMenu === 'charts' ? (
          <p>Active Charts</p>
        ) : (
          <div className="stock-display text-sm">
            <span className="stock-symbol">{selectedStock}</span>

            <span className="stock-change">
              {Number(selectedQuote?.todaysChange).toFixed(2)}
            </span>
            <span className="stock-change">
              {Number(selectedQuote?.todaysChangePerc).toFixed(2)}%
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full p-1 mr-5 mt-[-1.2rem] z-[999999]">
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
