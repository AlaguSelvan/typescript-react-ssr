import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
	padding: 32px;
	background-color: hotpink;
	font-size: 24px;
	border-radius: 4px;
	color: black;
	font-weight: bold;
	&:hover {
		color: white;
	}
`;

interface Props {
	children?:
		| ReactChild
		| ReactFragment
		| ReactPortal
		| boolean
		| null
		| undefined;
	value?: string;
}

const Button: React.FC<Props> = ({ value }) => {
	const [count, setCount] = React.useState<number>(0);
	return (
		<ButtonContainer data-testid="button" onClick={() => setCount(count + 1)}>
			{value || `Clicked ${count} times`}
		</ButtonContainer>
	);
};

export default Button;
