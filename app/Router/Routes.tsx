import * as React from 'react'
import loadable from '@loadable/component';

const Loading = () => (
	<div>...Loading</div>
)

export const Home = loadable(() =>
	import(/* webpackPrefetch: true */ '../container/Home')
);

export const About = loadable(() =>
	import(/* webpackPrefetch: true */ '../container/About')
);

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		// loadData: () => [
		// ]
	}, {
		path: '/about',
		exact: true,
		component: About
	}
]

export default routes