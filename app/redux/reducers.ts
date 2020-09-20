import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import Home from './home/reducer';
import { Reducer } from 'react';

const rootReducer = (history: History): Reducer<any, any> =>
	combineReducers({
		Home,
		router: connectRouter(history)
	});

export default rootReducer;
