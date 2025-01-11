import { describe, it, expect, vi } from 'vitest';
import StockProvider, { StockContext } from '../../src/StockContext.jsx';
import { renderWithProviders } from '../mock-store';
import { useContext } from 'react';

const TestApp = () => {
  const liveFeature = useContext(StockContext);
  return (
    <StockProvider>
      <div>{liveFeature ? 'live feature' : 'negative'}</div>
    </StockProvider>
  );
};

describe('StockProvider', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(<StockProvider />);
    expect(container).toBeTruthy();
  });
  it('should have the value liveFeature set to true', () => {
    const { container } = renderWithProviders(<TestApp />);
    expect(container.textContent).toBe('negative');
  });
});
