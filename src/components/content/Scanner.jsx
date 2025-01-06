import React from 'react';
import Scan from '../scanner/Scan.jsx';
import Feed from '../scanner/Feed.jsx';
import GradientSection from '../shared/GradientSection.jsx';

const Scanner = () => {
  return (
    <div>
      <GradientSection>
        <Scan />
      </GradientSection>
      <Feed />
    </div>
  );
};

export default Scanner;
