import { createReducer } from "redux-create-reducer";

const initialState = [];

const ADD_SOUND = "ADD_SOUND";

export default createReducer(initialState, {
  [ADD_SOUND](state, action) {
    return [...state];
  }
});
