import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './Router/Routes'

export default function App() {
  return (
    <Switch>
      {routes.map(({ component, ...route }: any, index: number) => {
        return (
          <Route key={index} component={component} {...route} />
        )
      })}
    </Switch>
  )
}
