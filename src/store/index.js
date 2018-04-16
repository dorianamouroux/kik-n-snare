import { createStore, combineReducers } from "redux";
import sound from "./sound";

const reducers = combineReducers({
  sound
});

const store = createStore(reducers);

export default store;
