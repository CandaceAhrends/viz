import React from 'react';
import Navigation from './components/navigation/Navigation.jsx';
import Container from './components/content/Container.jsx';
import StockProvider from './StockContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import './app.scss';

const loadPath = window.location.href?.split('/').pop();
console.log('loadPath', loadPath);
function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <div className="flex w-screen h-screen">
          <Navigation loadPath={loadPath}></Navigation>
          <Container></Container>
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
