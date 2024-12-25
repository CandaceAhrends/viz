import React from 'react';
import SideMenu from '../navigation/SideMenu';
import HamIconToggle from './HamIconToggle';

const Header = () => {
  return (
    <header className="text-white h-[40px]  mt-1  border-b border-neutral-900 ">
      <div className="flex justify-end w-full p-1 mr-5 mt-[.1rem] z-[999999]">
        <HamIconToggle Menu={SideMenu} />
      </div>
    </header>
  );
};

export default Header;
