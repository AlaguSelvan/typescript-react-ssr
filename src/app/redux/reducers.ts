import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import HomeReducer from './home/home.reducer';

console.log('hit here')

export default (history: History) =>
  combineReducers({
    HomeReducer,
    router: connectRouter(history)
  });
