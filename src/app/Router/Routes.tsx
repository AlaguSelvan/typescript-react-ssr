import * as React from 'react'
import loadable from '@loadable/component';

const Loading = () => (
	<div>...Loading</div>
)

export const Home = loadable(() =>
	import(/* webpackPrefetch: true */ '../pages/Home')
);

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		// loadData: () => [
		// ]
	}
]

export default routes