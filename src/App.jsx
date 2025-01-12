import React, { useEffect } from 'react';
import Navigation from './components/navigation/Navigation.jsx';
import Router from './components/content/Router.jsx';
import StockProvider from './StockContext.jsx';
import { setDate } from './features/stocksSlice';
import { getPreviousMarketDate } from './utils';
import { useAppDispatch } from './hooks';
import { BrowserRouter } from 'react-router-dom';
import './app.scss';

const loadPath = window.location.href?.split('/').pop() || '/';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDate(getPreviousMarketDate()));
  }, []);

  return (
    <StockProvider>
      <BrowserRouter>
        <div className="flex w-screen h-screen">
          <Navigation loadPath={loadPath}></Navigation>
          <Router></Router>
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
