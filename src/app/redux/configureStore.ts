import { createBrowserHistory, createMemoryHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

interface Argv {
  initialState?: object;
  url?: string;
}

export default ({ initialState, url }: Argv) => {
  const isServer = typeof window === 'undefined';
  console.log({isServer})
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
      initialEntries: [url || '/']
    })
    : createBrowserHistory();
  console.log({history})
  const middlewares = [
    routerMiddleware(history),
    thunk
    // Add other middlewares here
  ];
  console.log({middlewares})
  // Use Redux DevTools Extension in development
  const composeEnhancers =
  // @ts-ignore
  (!isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
  console.log({composeEnhancers})
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
        const createNextReducer = require('./reducers').default;

        store.replaceReducer(createNextReducer(history));
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`);
      }
    });
  }

  return { store, history };
};