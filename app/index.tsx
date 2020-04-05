import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'

// @ts-ignore
const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({initialState})
const cache = createCache()

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const render = () => {
  return renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

if ((module).hot) {
  // Enable webpack hot module replacement for routes
  (module).hot.accept('./Router/index.ts', () => {
    try {
      const nextRoutes = require('./Router/index.ts').default;

      render()
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
