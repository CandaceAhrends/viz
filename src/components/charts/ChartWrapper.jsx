import Reac, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks';

const ChartWrapper = ({ children }) => {
  const stockDataMap = useAppSelector((state) => state.chartSync.stockDataMap);
  const isScannerOpen = useAppSelector((state) => state.scanner.isScannerOpen);
  const [liveChart, setLiveChart] = useState(new Map());
  const [socketReady, setSocketReady] = useState(0);
  const [stockListReady, setStockListReady] = useState(false);
  const ws = useRef(null);
  const chartMap = useRef(new Map());
  const collectedCandles = useRef(new Map());
  const activeCandles = useRef(new Map());
  const chartTime = useRef(new Map());
  const chartDate = useRef(new Map());
  console.log('chart wrapper redraw');
  useEffect(() => {
    if (!stockDataMap) return;

    const mapData = Object.entries(JSON.parse(stockDataMap)).map(
      ([key, value]) => {
        return [key, value];
      }
    );
    console.log('got map data');
    chartMap.current = new Map(mapData);
    setStockListReady(true);
  }, [stockDataMap]);
  return <div>{children}</div>;
};

export default ChartWrapper;
