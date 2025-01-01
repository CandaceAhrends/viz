import React from 'react';
import SideList from './SideList.jsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
// const openLinkInNewTab = (symbol) => {
//     const url = `${YAHOO_FINANCE_NEWS_URL}${symbol}/news`;
//     window.open(url, '_blank');
//   };

const PopoutPage = () => {
  const stocks = useAppSelector((state) => state.historicalData.topVolume);

  return <SideList stocks={stocks} />;
};

export default PopoutPage;
