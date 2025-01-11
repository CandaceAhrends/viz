import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import ChartDescription from '../../src/components/charts/ChartDescription';
import axios from 'axios';

vi.mock('axios');
const mockData = {
  data: {
    results: {
      primary_exchange: 'primary_exchange',
      sic_description: 'sic_description',
      name: 'name',
      description: 'description',
    },
  },
};

const news = {
  published_utc: '2021-01-01',
  title: 'Mock News',
};
axios.get.mockResolvedValue(mockData); // Set the mock response for the GET request

describe('ChartDescription', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(
      <ChartDescription news={news} symbol="MOCK" />
    );
    const liElements = container.querySelectorAll('li');
    expect(liElements.length).toBe(4);
    expect(container).toBeTruthy();
  });
});
