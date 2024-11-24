import React from 'react';
import Navigation from './components/navigation/Navigation.jsx';
import Container from './components/content/Container.jsx';

function App() {
  return (
    <div className="flex w-screen h-screen">
      <Navigation></Navigation>
      <Container></Container>
    </div>
  );
}

export default App;
