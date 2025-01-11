import React from 'react';
import { renderWithProviders } from '../mock-store';
import { describe, it, expect, vi } from 'vitest';
import SuccessMessage from '../../src/components/shared/SuccessMessage';

describe('SuccessMessage', () => {
  it('renders without error', () => {
    const { container } = renderWithProviders(
      <SuccessMessage>test message</SuccessMessage>
    );
    const element = container.getElementsByClassName('success-message');
    expect(element[0].textContent).toEqual('!test message');
  });
});
