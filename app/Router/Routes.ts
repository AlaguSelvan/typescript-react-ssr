import loadable from "@loadable/component";

// const Loading = () => <div>...Loading</div>;

export const Home = loadable(() => import("../container/Home"));

export const About = loadable(() => import("../container/About"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
    // loadData: () => [
    // ]
  },
  {
    path: "/about",
    exact: true,
    component: About
  }
];

export default routes;
