import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import HomeReducer from "./home/reducer";

const rootReducer = (history: History) =>
  combineReducers({
    HomeReducer,
    router: connectRouter(history)
  });

export default rootReducer;
