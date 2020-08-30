import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Button from '../Button';

afterEach(cleanup);

test('should match snapshot', () => {
	const { asFragment } = render(<Button />);
	expect(asFragment).toMatchSnapshot();
});

test('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Button />, div);
	ReactDOM.unmountComponentAtNode(div);
});

test('renders the prop', () => {
	const value = 'click me';
	const { getByTestId } = render(<Button value={value} />);
	expect(getByTestId('button')).toHaveValue(value);
});

// test('should match snapshot', () => {
//   const { asFragment } = render(<Button />);
//   expect(asFragment).toMatchSnapshot();
// });
