import React from 'react';
import SideMenu from '../navigation/SideMenu.jsx';
import HamIconToggle from '../navigation/HamIconToggle.jsx';
import { useAppSelector } from '../../hooks';
import dayjs from 'dayjs';
import GitHubSvg from '../images/GitHubSvg.jsx';

const Header = () => {
  const selectedStockDate = dayjs(useAppSelector((state) => state.stocks.date));
  const selectedStock = useAppSelector(
    (state) => state.historicalData.selectedStock
  );

  return (
    <header className="text-white h-[40px]  mt-1  border-b border-neutral-900 ">
      <a
        target="_blank"
        href="https://github.com/CandaceAhrends/viz"
        className="flex items-center  text-white text-xs  p-2 absolute top-[-.5rem] left-3 md:left-20"
      >
        <GitHubSvg />
        <span className="m-2 mt-5">Code</span>
      </a>
      <div className="flex justify-center text-green ">
        <div className="stock-display text-sm">
          <span className="stock-symbol">{selectedStock?.symbol}</span>

          <span className="stock-date">
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
