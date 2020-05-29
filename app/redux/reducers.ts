import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import Home from './home/reducer';

const rootReducer = (history: History) =>
  combineReducers({
    Home,
    router: connectRouter(history)
  });

export default rootReducer;
