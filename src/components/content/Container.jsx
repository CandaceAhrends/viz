import React from 'react';
import Header from './Header.jsx';
import NewsGrid from './NewsGrid.jsx';
import { Route, Routes } from 'react-router-dom';
import ChartGrid from './ChartGrid.jsx';
import Page from './Page.jsx';
import ScannerPage from '../scanner/ScannerPage.jsx';

const ContentContainer = () => {
  console.log('content container redraw');
  return (
    <div className="flex flex-col text-white flex-grow w-full">
      <Header />
      <Routes>
        <Route path="/scan" element={<ScannerPage />} />
        <Route path="/news" element={<NewsGrid />} />
        <Route path="/charts" element={<ChartGrid />} />
        <Route path="/" element={<Page />} />
      </Routes>
    </div>
  );
};

export default ContentContainer;
