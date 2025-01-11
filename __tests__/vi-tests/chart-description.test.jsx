import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import ChartDescription from '../../src/components/charts/ChartDescription';

describe('ChartDescription', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(<ChartDescription />);
    expect(container).toBeTruthy();
  });
});
