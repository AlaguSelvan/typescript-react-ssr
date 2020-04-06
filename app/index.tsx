import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { AppContainer } from "react-hot-loader";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { hydrate as emotionHydrate } from "emotion";

import App from "./App";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const initialState = window.__INITIAL_STATE__;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const emotionIds = window.__ids__;
const { store, history } = configureStore({ initialState });
const cache = createCache();
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const render = () => {
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};

loadableReady(() => {
  render();
});

// emotionHydrate(emotionIds);
if (module.hot) {
  module.hot.accept();
}
