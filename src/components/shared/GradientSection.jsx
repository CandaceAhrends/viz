import React from 'react';
import './shared.scss';

const GradientSection = ({ children }) => {
  return <div className="gradient border-b border-green">{children}</div>;
};

export default GradientSection;
