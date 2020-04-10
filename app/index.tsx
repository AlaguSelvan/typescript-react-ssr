import React from 'react';
import ReactDOM from 'react-dom';
// import { loadableReady } from '@loadable/component';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { hydrate as emotionHydrate } from 'emotion';

import App from './App';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({ initialState });
const cache = createCache();
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const render = () => {
  renderMethod(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV === 'development') {
  // loadableReady(() => {
  render();
  // });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const emotionIds = window.__emotion;
  if (emotionIds) emotionHydrate(emotionIds);
  if ((module as any).hot) {
    (module as any).hot.accept('./Router');
    (module as any).hot.accept();
  }
} else {
  render();
}
