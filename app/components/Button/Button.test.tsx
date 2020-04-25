import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

test('should match snapshot', () => {
  const { asFragment } = render(<Button />);
  expect(asFragment).toMatchSnapshot();
});

test('has text when text prop is passed', () => {
  const value = 'hello';
  const { getByTestId } = render(<Button value="hello" />);
  expect(getByTestId('para')).toHaveTextContent(value);
});
