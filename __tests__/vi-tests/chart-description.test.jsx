import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChartDescription from '../../src/components/charts/ChartDescription';

describe('ChartDescription', () => {
  it('renders without error', () => {
    render(<ChartDescription />);
  });

  // Add more test cases here
});
