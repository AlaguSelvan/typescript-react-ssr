import React from 'react';
import ReactDOM from 'react-dom';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import { AppContainer } from 'react-hot-loader';
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

const render = (Component: any) => {
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CacheProvider value={cache}>
            <Component />
          </CacheProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (process.env.NODE_ENV === 'development') {
  // loadableReady(() => {
  // });
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const emotionIds = window.__emotion;
  if (emotionIds) emotionHydrate(emotionIds);
  if ((module as any).hot) {
    const NewAppRoot = require('./App.tsx').default;
    (module as any).hot.accept('./Router/Routes.tsx', () => {
      // const NewAppRoot = require('./App/AppRoot.js').default;
      // render(NewAppRoot);
      render(NewAppRoot);
    });
    (module as any).hot.accept();
    render(App);
  }
}
