import * as React from 'react'

// const UniversalComponent = universal(
//   props => import(`../Views/${props.page}`),
//   {
//     loading: () => <div> Loading...</div>,
//     ignoreBabelRename: true
//   }
// );
// export const Home = loadable(() =>
// 	import(/* webpackPrefetch: true */ '../pages/Home')
// );

const routes = [
	{
		path: '/',
		exact: true,
		page: 'Home',
		// loadData: () => [
		// ]
	}
]

export default routes