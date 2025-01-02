import React, { useEffect } from 'react';
import ChartWrapper from '../charts/ChartWrapper';

const ChartGrid = () => {
  console.log('chart grid redraw');
  // useEffect(() => {
  //   console.log('chart grid mounted');

  //   const chartWrapper = document.getElementById('chart-wrapper');
  //   if (chartWrapper) {
  //     chartWrapper.style.display = 'block';
  //   }

  //   return () => {
  //     if (chartWrapper) {
  //       chartWrapper.style.display = 'none';
  //     }
  //   };
  // }, []);
  return (
    <div className="flex flex-col w-full h-full">
      <ChartWrapper />
    </div>
  );
};

export default ChartGrid;
