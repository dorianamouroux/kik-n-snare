import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import { default as soundReducer } from "./sound";
import { default as userReducer } from "./user";

const reducers = combineReducers({
  sound: soundReducer,
  user: userReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
