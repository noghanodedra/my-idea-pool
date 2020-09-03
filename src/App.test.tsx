import 'mutationobserver-shim';

import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders app title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/The Idea Pool/i);
  expect(linkElement).toBeInTheDocument();
});
