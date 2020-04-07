/* eslint-disable @typescript-eslint/no-var-requires */
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

interface Argv {
  initialState?: object;
  url?: string;
}

const configureStore = ({ initialState, url }: Argv) => {
  const isServer = typeof window === 'undefined';
  const isDev = process.env.NODE_ENV === 'development';
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url || '/']
      })
    : createBrowserHistory();
  const middlewares = [
    routerMiddleware(history),
    thunk
    // Add other middlewares here
  ];
  // Use Redux DevTools Extension in development
  const composeEnhancers =
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    (isDev && !isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares)
    // Add other enhancers here
  );
  const store = createStore(
    createRootReducer(history),
    initialState || {},
    enhancers
  );

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('./reducers', () => {
      try {
        const createNextReducer = require('./reducers');

        store.replaceReducer(createNextReducer(history));
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`);
      }
    });
  }

  return { store, history };
};

export default configureStore;
