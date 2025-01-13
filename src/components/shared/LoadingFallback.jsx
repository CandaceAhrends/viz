import React from 'react';
import { LineWave } from 'react-loader-spinner';

const LoadingFallback = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[30rem]">
      <p className="text-lg">Loading...</p>
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
  );
};

export default LoadingFallback;
