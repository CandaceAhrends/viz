import React from 'react';
import Navigation from './components/navigation/Navigation.jsx';
import Container from './components/content/Container.jsx';
import StockProvider from './StockContext.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <div className="flex w-screen h-screen">
          <Navigation></Navigation>
          <Container></Container>
        </div>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
