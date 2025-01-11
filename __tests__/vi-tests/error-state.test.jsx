import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import ErrorState from '../../src/components/shared/ErrorState';
import { STOCK_SELECT_ERROR_MSG } from '../../src/consts';

describe('ErrorState', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(<ErrorState />);
    const element = container.getElementsByClassName('error-state');
    expect(element[0]).toBeTruthy();
  });
  it('should contain the default error message', () => {
    const { container } = renderWithProviders(<ErrorState />);
    const element = container.getElementsByClassName('text');
    expect(element[0].textContent).toEqual(STOCK_SELECT_ERROR_MSG);
  });
});
