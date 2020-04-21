import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

test('Shows the children when children is passed', () => {
  const testMessage = 'Test Message';
  render(<Button>{testMessage}</Button>);
});
