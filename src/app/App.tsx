import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './Router/routes'

export default function App() {
  return (
    <Switch>
      {routes.map(({ component, ...route }, index) => {
        return (
          <Route key={index} component={component} {...route} />
        )
      })}
    </Switch>
  )
}
