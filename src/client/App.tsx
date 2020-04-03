import React from 'react'
import { Switch, Route } from 'react-router-dom'
import universal from 'react-universal-component';
import routes from './Router/Routes'

export const UniversalComponent = universal(
  (props: any) => import(`./pages/${props.page}`),
  {
    loading: () => <div> Loading...</div>,
    ignoreBabelRename: true
  }
);

export default function App() {
  return (
    <Switch>
      {routes.map((route: any, index: number) => {
        return (
          <Route key={index} exact path={route.path}>
            <UniversalComponent page={route.component} {...route} />
          </Route>
          // <Route
          //   key={index}
          //   render={routeProps => (
          //   )}
          // />
        );
      })}
    </Switch>
  )
}
