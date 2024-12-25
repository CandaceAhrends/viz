import React from 'react';
import Scan from './Scan.jsx';
import Feed from './Feed.jsx';

// const openLinkInNewTab = (symbol) => {
//     const url = `${YAHOO_FINANCE_NEWS_URL}${symbol}/news`;
//     window.open(url, '_blank');
//   };

const PopoutPage = () => {
  return (
    <div>
      <Feed />
    </div>
  );
};

export default PopoutPage;
