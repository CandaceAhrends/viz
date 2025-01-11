import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../src/components/header/Header';
import dayjs from 'dayjs';

const preloadedState = {
  stocks: {
    date: dayjs(),
  },
  historicalData: {
    selectedStock: {
      symbol: 'MOCK',
    },
    filteredStocks: [],
  },
};

describe('Header', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(<Header />, { preloadedState });
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const element = container.getElementsByClassName('stock-date');
    expect(element[0].textContent).toEqual(currentDate);
  });
});
