import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';

declare global {
	interface Window {
		__INITIAL_STATE__: any;
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
	}
}

const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({ initialState });
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const render = () => {
	renderMethod(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('root')
	);
};

if (process.env.NODE_ENV === 'development') {
	loadableReady(() => {
		render();
	});
	if ((module as any).hot) {
		(module as any).hot.accept('./Router');
		(module as any).hot.accept();
	}
} else {
	render();
}
