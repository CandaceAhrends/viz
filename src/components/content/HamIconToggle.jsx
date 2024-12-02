import React, { useState } from 'react';

const HAM_CLASSES = 'w-5 h-[.2rem] rounded-full bg-white';

const HamIconToggle = ({ Menu }) => {
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  return (
    <div className="mr-[2rem]">
      <ul
        className={`group ${
          sideMenuOpen ? 'is-open' : ''
        } flex flex-col items-center gap-1 cursor-pointer `}
        onClick={() => setSideMenuOpen(!sideMenuOpen)}
      >
        <li
          className={`${HAM_CLASSES} transition group-[.is-open]:rotate-45 group-[.is-open]:translate-y-2`}
        ></li>
        <li
          className={`${HAM_CLASSES} group-[.is-open]:scale-x-0 transition`}
        ></li>
        <li
          className={`${HAM_CLASSES} group-[.is-open]:-rotate-45 group-[.is-open]:-translate-y-[.4rem]`}
        ></li>
      </ul>
      <Menu isOpen={sideMenuOpen} />
    </div>
  );
};

export default HamIconToggle;
