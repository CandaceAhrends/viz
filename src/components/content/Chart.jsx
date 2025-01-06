import React, { useEffect } from 'react';
import SelectedChart from '../charts/SelectedChart';

const Chart = () => {
  console.log('chart grid redraw');
  const [showChart, setShowChart] = React.useState(false);

  useEffect(() => {
    console.log('chart grid mounted');

    const chartWrapper = document.getElementById('chart-wrapper');
    if (chartWrapper) {
      chartWrapper.style.display = 'block';
    }

    setTimeout(() => {
      setShowChart(false);
    }, 1);

    return () => {
      if (chartWrapper) {
        chartWrapper.style.display = 'none';
      }
    };
  }, []);
  return (
    <>
      <SelectedChart />
    </>
  );
};

export default Chart;
