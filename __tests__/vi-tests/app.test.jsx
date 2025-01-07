import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import App from '../../src/App';

describe('App', () => {
  it('renders App component', () => {
    const { container } = ReactDOM.render(<App />);
    expect(container).toMatchSnapshot();
  });
});
