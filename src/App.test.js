import { render, screen } from '@testing-library/react';
import App from './App';

test('renders IBDAA app', () => {
  render(<App />);
  const heading = screen.getByText(/Crafted for/i);
  expect(heading).toBeInTheDocument();
});
