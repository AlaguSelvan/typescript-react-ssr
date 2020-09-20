import React, { createContext, useState, useEffect } from 'react';

export const HomeContext = createContext({
	data: []
});

interface IProps {
	children?: any;
}

const HomeProvider: React.FC<IProps> = ({ children }) => {
	const [data, setData] = useState([]);
	const fetchData = async () => {
		const { data }: any = await fetch(
			'https://jsonplaceholder.typicode.com/users'
		);
		setData(data);
	};
	fetchData();

	useEffect(() => {
		fetchData();
	}, [data]);

	return (
		<HomeContext.Provider
			value={{
				data
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};

export default HomeProvider;
