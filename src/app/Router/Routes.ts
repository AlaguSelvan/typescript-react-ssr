import path from 'path'
import LoadableHOC from './LoadableHOC'

const Home = LoadableHOC({
	loader: () => import('../pages/Home' /* webpackChunkName: "First" */),
	webpack: () => [require.resolveWeak('../pages/Home')],
	modules: ['../pages/Desktop/First'],
	path: ({ page }: any) => path.join(__dirname, `/public/${page}`)
})


const routes = [
	{
		path: '/',
		component: Home,
		serverFetch: '',
		exact: true
	}
]

export default routes