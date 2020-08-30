import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as HomeActions from '../../redux/home/actions';
import IUserData from '../../types/UserData';

interface IProps {
	userData: IUserData[];
	fetchInitialDataIfNeeded: () => void;
}
export const Home: React.FC<IProps> = ({
	userData,
	fetchInitialDataIfNeeded
}) => {
	const [data, setData] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const fetchUserData = async () => {
		setIsFetching(true);
		const { data } = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		setData(data);
		setIsFetching(false);
	};

	useEffect(() => {
		if (userData.length === 0) {
			fetchInitialDataIfNeeded();
		}
	}, []);

	return (
		<div>
			<p>Home Page...</p>
			<div style={{ display: 'flex' }}>
				<div>
					<b>Initial Preloaded Data</b>
					<ul>
						{userData.map(({ name }: any, index: number) => (
							<li key={index}>{name}</li>
						))}
					</ul>
				</div>
				<div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<b>Data from Client</b>
						{!isFetching ? (
							<button onClick={() => fetchUserData()}>Fetch Data</button>
						) : (
							<p>Fetching</p>
						)}
					</div>
					{!isFetching ? (
						<ul>
							{data.map(({ name }: any, index: number) => (
								<li key={index}>{name}</li>
							))}
						</ul>
					) : (
						<p>No Data</p>
					)}
				</div>
			</div>
			<Link to="/about">
				<p>Go To next 👉 page</p>
			</Link>
		</div>
	);
};

const mapStateToProps = ({ Home: { userData } }: any) => ({
	userData
});

const mapDispatchToProps = (dispatch: any) => ({
	fetchInitialDataIfNeeded: () => dispatch(HomeActions.fetchUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
