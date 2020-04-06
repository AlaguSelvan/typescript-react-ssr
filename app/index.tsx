import React from "react";
import { render, hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { AppContainer } from "react-hot-loader";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";

// @ts-ignore
const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({ initialState });
const cache = createCache();

function startRender() {
  const renderMethod = module.hot ? render : hydrate;
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
    document.getElementById("app"),
  );
}

loadableReady(() => {
  startRender();
});

if (module.hot) {
  // Enable webpack hot module replacement for routes
  module.hot.accept("./Router/index.ts", () => {
    try {
      const nextRoutes = require("./Router/index.ts").default;

      startRender();
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
