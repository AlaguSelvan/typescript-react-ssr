import loadable from '@loadable/component'

export const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ '../container/Home')
)

export const About = loadable(() =>
  import(/* webpackChunkName: "About" */ '../container/About')
)

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
]

export default routes
