// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import path from 'path';
import LoadableHOC from './LoadableHOC';

// export const Home = loadable(() =>
//   import(/* webpackChunkName: "Home" */ '../container/Home')
// );

// export const About = loadable(() =>
//   import(/* webpackChunkName: "About" */ '../container/About')
// );

const Home = LoadableHOC({
  loader: () => import('../container/Home' /* webpackChunkName: "Home" */),
  webpack: () => [require.resolveWeak('../container/Home')],
  modules: ['../container/Home'],
  path: ({ page }: any) => path.join(`/public/${page}`)
});

const About = LoadableHOC({
  loader: () => import('../container/About' /* webpackChunkName: "About" */),
  webpack: () => [require.resolveWeak('../container/About')],
  modules: ['../container/About'],
  path: ({ page }: any) => path.join(`/public/${page}`)
});

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
    // loadData: () => [
    // ]
  },
  {
    path: '/about',
    exact: true,
    component: About
  }
];

export default routes;
