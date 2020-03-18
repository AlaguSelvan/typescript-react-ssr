import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const state = window.__INITIAL_STATE__
const store = configureStore(state)
const cache = createCache()

const render = () => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <Provider store={store}>
        <BrowserRouter>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

Loadable.preloadReady().then(() => {
  render()
})
