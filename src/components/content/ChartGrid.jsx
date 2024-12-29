import React, { useEffect, useState, useRef } from 'react';
//import ChartWrapper from '../charts/ChartWrapper';
import ChartSocket from '../charts/ChartSocket';

const ChartGrid = () => {
  console.log('chart grid redraw');
  return <ChartSocket></ChartSocket>;
};

export default ChartGrid;
