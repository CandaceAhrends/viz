import React, { useEffect } from 'react';
import ChartWrapper from '../charts/ChartWrapper';
import { LineWave } from 'react-loader-spinner';

const ChartGrid = () => {
  console.log('chart grid redraw');
  const [showChart, setShowChart] = React.useState(false);

  useEffect(() => {
    console.log('chart grid mounted');

    const chartWrapper = document.getElementById('chart-wrapper');
    if (chartWrapper) {
      chartWrapper.style.display = 'block';
    }

    setTimeout(() => {
      setShowChart(true);
    }, 1);

    return () => {
      if (chartWrapper) {
        chartWrapper.style.display = 'none';
      }
    };
  }, []);
  return (
    <>
      {!showChart && (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <p className="text-lg">Loading Charts...</p>
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      )}
    </>
  );
};

export default ChartGrid;
