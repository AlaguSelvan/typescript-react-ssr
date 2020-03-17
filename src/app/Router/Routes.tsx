import React, { Fragment } from 'react';
import universal from 'react-universal-component';
import { Route, Switch, Redirect } from 'react-router';

const UniversalComponent = universal(
	(props: any) => import(`../Views/${props.page}`),
	{
		loading: () => <div > Loading... </div>,
		ignoreBabelRename: true
	}
);

export const routes = [
	{
		exact: true,
		path: `/`,
		page: 'Home',
	}
];
	export default () => (
		<Fragment>
		<Switch>
		{routes.map((route) => (
				<Route
				key={route.path}
				render={(routeProps) => (
					<UniversalComponent page={route.page} {...routeProps} />
					)}
					{...route}
					/>
			))
		}
		</Switch>
		</Fragment>
	)