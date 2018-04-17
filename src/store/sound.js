import { createReducer } from "redux-create-reducer";

const initialState = [
  {
    name: "kick",
    pattern: "1010010010000000"
  },
  {
    name: "snare",
    pattern: "0000100000001010"
  },
  {
    name: "hithat",
    pattern: "1010101010101010"
  }
];

const ADD_SOUND = "ADD_SOUND";

export default createReducer(initialState, {
  [ADD_SOUND](state, action) {
    return [...state];
  }
});
