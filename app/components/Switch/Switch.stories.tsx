import React from 'react';
import Switch from './Switch';

export default {
	component: Switch,
	title: 'Toggle'
};

export const Base: React.FC<Element> = () => {
	const [checked, setChecked] = React.useState(true);

	return (
		<>
			<Switch checked={checked} onChange={() => setChecked(!checked)} />
		</>
	);
};
