import React from 'react';
import Scan from './Scan.jsx';
import Feed from './Feed.jsx';
import GradientSection from '../shared/GradientSection.jsx';

const ScannerPage = () => {
  const [scanConfig, setScanConfig] = React.useState({});
  return (
    <div>
      <GradientSection>
        <Scan setScanConfig={setScanConfig} />
      </GradientSection>

      <Feed scanConfig={scanConfig} />
    </div>
  );
};

export default ScannerPage;
