import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
//import SelectedChart from '../charts/SelectedChart';
import ChartWrapper from '../charts/ChartWrapper';
import ErrorState from '../shared/ErrorState';

const Chart = () => {
  console.log('chart grid redraw');
  const hasError = useAppSelector((state) => state.historicalData.hasError);

  useEffect(() => {
    console.log('chart grid mounted');

    const chartWrapper = document.getElementById('chart-wrapper');
    if (chartWrapper) {
      chartWrapper.style.display = 'block';
    }

    return () => {
      if (chartWrapper) {
        chartWrapper.style.display = 'none';
      }
    };
  }, []);
  return <>{hasError ? <ErrorState /> : <ChartWrapper />}</>;
};

export default Chart;
