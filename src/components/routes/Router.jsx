import React, { Suspense } from 'react';
import Header from '../layout/Header.jsx';
import News from './News.jsx';
import { Route, Routes } from 'react-router-dom';
import LoadingFallback from '../shared/LoadingFallback.jsx';
const Chart = React.lazy(() => import('./Chart.jsx'));
const Market = React.lazy(() => import('./Market.jsx'));
const Scanner = React.lazy(() => import('./Scanner.jsx'));
const Config = React.lazy(() => import('./Config.jsx'));
const TiingoNews = React.lazy(() => import('../news/TiingoNews.jsx'));
const AllNews = React.lazy(() => import('../news/AllNews.jsx'));
// const LiveFeed = React.lazy(() => import('../scanner/LiveFeed.jsx'));

// import Chart from './Chart.jsx';
// import Market from './Market.jsx';
// import Scanner from './Scanner.jsx';
// import Config from './Config.jsx';
// import TiingoNews from '../news/TiingoNews.jsx';
// import AllNews from '../news/AllNews.jsx';
// import LiveFeed from '../scanner/LiveFeed.jsx';

const Router = () => {
  return (
    <div className="flex flex-col text-white flex-grow w-full bg-black">
      <Suspense fallback={<LoadingFallback />}>
        <Header />
        <Routes>
          <Route path="/scan" element={<Scanner />} />
          <Route path="/news" element={<News />} />
          <Route path="/charts" element={<Chart />} />
          <Route path="/config" element={<Config />} />
          <Route path="/tiingo" element={<TiingoNews />} />
          <Route path="/allnews" element={<AllNews />} />
          {/* <Route path="/livefeed" element={<LiveFeed />} /> */}
          <Route path="/" element={<Market />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Router;
