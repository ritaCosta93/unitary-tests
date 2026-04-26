import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../components/counter';

it('should show and hide error when counter goes negative and back to zero', async () => {
  render(<Counter />);

  expect(screen.getByText('Count: 0')).toBeInTheDocument()

  const decrement = screen.getByRole('button',{name:/decrement/i});
  await userEvent.click(decrement)
  expect(screen.getByText('Count: -1')).toBeInTheDocument()
  expect(screen.getByText("The counter can't be negative")).toBeInTheDocument()

  const increment = screen.getByRole('button',{name: /increment/i});
  await userEvent.click(increment)
  expect(screen.getByText('Count: 0')).toBeInTheDocument()
  expect(screen.queryByText("The counter can't be negative")).not.toBeInTheDocument()

});