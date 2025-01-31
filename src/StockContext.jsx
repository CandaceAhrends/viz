import React, { useRef, useEffect } from 'react';
import { createContext } from 'react';
import { SCANNER_WS_URI } from './consts';
import { useDispatch } from 'react-redux';
import { setTopVolume, setTopGainers } from './features/scannerSlice';
import { LIVE_FEATURE } from './consts';
//* omit
export const StockContext = createContext();

const StockProvider = ({ children }) => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const [liveFeature, setLiveFeature] = React.useState(LIVE_FEATURE);

  useEffect(() => {
    if (LIVE_FEATURE) {
      ws.current = new WebSocket(SCANNER_WS_URI);
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { sortedGainers, stocks, topGainerList, topVolumeList } = data;
        dispatch(
          setTopGainers(
            sortedGainers.map((s) => ({
              ...s,
              percent: Number.parseFloat(s.gain),
              isPositive: s.gain > 0,
            }))
          )
        );
        dispatch(setTopVolume(stocks.map((s) => ({ ...s, symbol: s.ticker }))));
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      return () => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.close();
        }
      };
    }
  }, []);

  return (
    <StockContext.Provider value={{ liveFeature }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
