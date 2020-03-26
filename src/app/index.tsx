import React from 'react'
import { render, hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component';
import { AppContainer } from 'react-hot-loader'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'

const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({initialState})
const cache = createCache()

const startRender = () => {
  const renderMethod = module.hot ? render : hydrate
  console.log({window})
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
    ,
    document.getElementById('root')
  )
}

loadableReady(() => {
  startRender()
});

if ((module as any).hot) {
  // Enable webpack hot module replacement for routes
  (module as any).hot.accept('./Router/Routes.tsx', () => {
    try {
      const nextRoutes = require('./Router/Routes.tsx').default;

      startRender()
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
