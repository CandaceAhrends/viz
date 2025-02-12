import React from 'react';
import Scan from '../scanner/Scan.jsx';
import Feed from '../scanner/Feed.jsx';
import { useAppSelector } from '../../hooks';
import ErrorState from '../shared/ErrorState';
import GradientSection from '../shared/GradientSection.jsx';

const Scanner = () => {
  const hasError = useAppSelector((state) => state.historicalData.hasError);
  return (
    <div>
      {hasError ? (
        <ErrorState />
      ) : (
        <>
          <GradientSection>
            <Scan />
          </GradientSection>
          <Feed />
        </>
      )}
    </div>
  );
};

export default Scanner;
