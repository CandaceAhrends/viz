import React from 'react';
import Header from './Header.jsx';
import ViewGrid from './ViewGrid.jsx';
import { Route, Routes } from 'react-router-dom';
import ChartGrid from './ChartGrid.jsx';

const ContentContainer = () => {
  return (
    <div className="flex flex-col text-white flex-grow w-full">
      <Header />
      <Routes>
        <Route path="/" element={<ViewGrid />} />
        <Route path="/charts" element={<ChartGrid />} />
      </Routes>
    </div>
  );
};

export default ContentContainer;
