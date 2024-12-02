import React from 'react';
import SideMenu from '../navigation/SideMenu';
import HamIconToggle from './HamIconToggle';

const FED_CALENDAR = 'https://www.federalreserve.gov/newsevents/calendar.htm';
const FOMC_COUNTDOWN =
  'https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html';

const Header = () => {
  return (
    <header className="bg-black-900 text-white h-[40px]  mt-0  border-b border-neutral-900 ">
      <div className="flex justify-between w-full  ml-3 mt-2">
        <p className="pl-4">Market Viz</p>

        <div className="mr-10 hover:cursor-pointer">
          <a
            href={FED_CALENDAR}
            target="_blank"
            rel="noreferrer"
            className="text-green-100 hover:text-green-200"
          >
            Fed Calendar
          </a>
        </div>
        <div className="mr-10 hover:cursor-pointer">
          <a
            href={FOMC_COUNTDOWN}
            target="_blank"
            rel="noreferrer"
            className="text-green-100 hover:text-green-200"
          >
            FOMC Countdown
          </a>
        </div>
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
