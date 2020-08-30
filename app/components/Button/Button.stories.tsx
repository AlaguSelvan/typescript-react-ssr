import React from 'react';
import Button from './Button';

export default {
	component: Button,
	title: 'Button'
};

export const Base: React.FC<Element> = () => {
	return (
		<>
			<Button />
		</>
	);
};
