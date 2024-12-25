import React from 'react';
import Logo from '../../assets/Logo.svg';
import ViewSvg from '../images/ViewSvg';
import GlobeSvg from '../images/GlobeSvg';
import PeopleSvg from '../images/PeopleSvg';
import ArrowSvg from '../images/ArrowSvg';
import ConfigSvg from '../images/ConfigSvg';
import { Link } from 'react-router-dom';

import './navigation.scss';

const routes = [
  { IconSvg: ViewSvg, path: '/scanner' },
  { IconSvg: ArrowSvg, path: 'charts' },
  { IconSvg: GlobeSvg, path: 'news' },
];

const Navigation = () => {
  const [selected, setSelected] = React.useState(0);
  return (
    <nav className="fixed flex-row bottom-0 h-[4rem] md:static md:h-full md:w-[4rem] md:flex-shrink-0  md:border-r md:border-black-900  bg-[#050505] ">
      <ul className="p-4">
        <li className="fixed hidden top-0 right-0 p-2 md:relative md:p-0 md:mx-auto md:block">
          <img src={Logo}></img>
        </li>
      </ul>
      <div className="min-h-[536px] main-nav">
        <ul className="flex flex-row fixed bottom-0 md:flex-col md:relative md:mt-[25px] side-nav">
          {routes.map((route, index) => (
            <li
              key={index}
              onClick={() => setSelected(index)}
              className={`p-2 flex justify-center  text-neutral-400 ${
                index === selected ? 'active' : ''
              } hover:text-brand-blue relative  `}
            >
              <Link to={route.path}>
                <route.IconSvg />
              </Link>
              <div
                className={`h-[.1rem] ${
                  index === selected ? 'selected' : 'hidden'
                }`}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
