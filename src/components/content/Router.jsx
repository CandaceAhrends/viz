import React from 'react';
import Header from '../header/Header.jsx';
import News from './News.jsx';
import { Route, Routes } from 'react-router-dom';
import Chart from './Chart.jsx';
import Market from './Market.jsx';
import Scanner from './Scanner.jsx';
import Config from './Config.jsx';
import TiingoNews from '../news/TiingoNews.jsx';
import AllNews from '../news/AllNews.jsx';

const Router = () => {
  console.log('content container redraw');
  return (
    <div className="flex flex-col text-white flex-grow w-full bg-black">
      <Header />
      <Routes>
        <Route path="/scan" element={<Scanner />} />
        <Route path="/news" element={<News />} />
        <Route path="/charts" element={<Chart />} />
        <Route path="/config" element={<Config />} />
        <Route path="/tiingo" element={<TiingoNews />} />
        <Route path="/allnews" element={<AllNews />} />
        <Route path="/" element={<Market />} />
      </Routes>
    </div>
  );
};

export default Router;
