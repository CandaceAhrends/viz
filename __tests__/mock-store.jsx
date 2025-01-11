import { setupStore } from '../src/store';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';

export const renderWithProviders = (
  ui,
  { preloadedState, store = setupStore(preloadedState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

export default renderWithProviders;
