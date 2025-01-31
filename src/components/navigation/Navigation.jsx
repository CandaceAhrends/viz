import React, { useEffect, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectMenu } from '../../features/navigationSlice';
import LoadingFallback from '../shared/LoadingFallback';
import Logo from '../../assets/logo.svg';
const ViewSvg = React.lazy(() => import('../images/ViewSvg'));
const GlobeSvg = React.lazy(() => import('../images/GlobeSvg'));
const ArrowSvg = React.lazy(() => import('../images/ArrowSvg'));
const ConfigSvg = React.lazy(() => import('../images/ConfigSvg'));
import { Link } from 'react-router-dom';
import './navigation.scss';

const routes = [
  { IconSvg: ViewSvg, path: 'scan' },
  { IconSvg: ArrowSvg, path: 'charts' },
  { IconSvg: GlobeSvg, path: 'news' },
  { IconSvg: ConfigSvg, path: '/' },
];

const Navigation = ({ loadPath }) => {
  const selectedMenu = useAppSelector((state) => state.navigation.selectedMenu);
  const dispatch = useAppDispatch();

  const setMenuSelected = ({ path }) => {
    dispatch(selectMenu(path));
  };

  useEffect(() => {
    if (loadPath) {
      setMenuSelected({ path: loadPath });
    }
  }, [loadPath]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <nav className="fixed flex-row z-[999999] bottom-0 h-[4rem] md:static md:h-full md:w-[4rem] md:flex-shrink-0  md:border-r md:border-black-900  bg-[#050505] ">
        <ul className="p-4">
          <li className="fixed hidden top-0 right-0 p-2 md:relative md:p-0 md:mx-auto md:block">
            <img src={Logo}></img>
          </li>
        </ul>
        <div className="min-h-[536px] main-nav">
          <ul className="flex flex-row fixed bottom-0 md:flex-col md:relative md:mt-[25px] side-nav">
            {routes.map((route) => (
              <li
                key={route.path}
                className={`p-2 flex justify-center   ${
                  route.path === selectedMenu ? 'selected text-brand-blue' : ''
                } hover:text-brand-blue relative  `}
              >
                <Link to={route.path} onClick={() => setMenuSelected(route)}>
                  <route.IconSvg />
                </Link>
                <div
                  className={`h-[.1rem] ${
                    route.path === selectedMenu ? 'selected' : 'hidden'
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navigation;
