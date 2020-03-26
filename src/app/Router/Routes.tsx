import * as React from 'react'
import loadable from '@loadable/component';

const Loading = (
	<div>...Loading</div>
)

export const Home = loadable(() =>
	import(/* webpackPrefetch: true */ '../pages/Home')
);

const getHome = () => import('../pages/Home')

const HomeLoadable = loadable(() => import('../pages/Home'), {
	fallback: <div>Loading... </div>
});

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		loadData: () => [
		]

	}
]

export default routes