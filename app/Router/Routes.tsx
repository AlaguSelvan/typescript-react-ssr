import loadable from '@loadable/component';
import * as HomeActions from '../redux/home/actions';

export const Home = loadable(() =>
	import(
		/* webpackPrefetch: true, webpackChunkName: "Home" */ '../container/Home'
	)
);

export const About = loadable(() =>
	import(/* webpackChunkName: "About" */ '../container/About')
);

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		loadData: (): Array<any> => {
			return [HomeActions.fetchUserData()];
		}
	},
	{
		path: '/about',
		exact: true,
		component: About
	}
];

export default routes;
