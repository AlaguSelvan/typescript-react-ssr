import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './Router';
import universal from 'react-universal-component';

const Loading = () => <div>Loading...</div>;

const UniversalComponent = universal(
  (props: any) => import(`./container/${props.page}`),
  {
    loading: () => <Loading />,
    ignoreBabelRename: true
  }
);

export default function App() {
  return (
    <Switch>
      {routes.map(({ component, ...route }: any) => {
        return (
          <Route
            key={route.path}
            render={(routeProps) => (
              <UniversalComponent page={component} {...routeProps} />
            )}
            {...route}
          />
        );
      })}
    </Switch>
  );
}
