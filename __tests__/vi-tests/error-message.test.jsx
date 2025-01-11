import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import ErrorMessage from '../../src/components/shared/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(
      <ErrorMessage message="test message" />
    );
    const element = container.getElementsByClassName('text');
    expect(element[0].textContent).toEqual('test message');
  });
});
