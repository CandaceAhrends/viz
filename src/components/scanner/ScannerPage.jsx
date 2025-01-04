import React from 'react';
import Scan from './Scan.jsx';
import Feed from './Feed.jsx';
import GradientSection from '../shared/GradientSection.jsx';

const ScannerPage = () => {
  return (
    <div>
      <GradientSection>
        <Scan />
      </GradientSection>
      <Feed />
    </div>
  );
};

export default ScannerPage;
