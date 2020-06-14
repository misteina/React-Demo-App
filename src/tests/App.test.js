import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders menu page', () => {
  const { getByText } = render(<App />);
    const linkElement = getByText(/Lecture Time Table/i);
    expect(linkElement).toBeInTheDocument();
});
