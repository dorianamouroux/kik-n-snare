import { createReducer } from "redux-create-reducer";
import cloneDeep from "clone-deep";

const initialState = [
  {
    name: "kick",
    pattern: "1010000010000000"
  },
  {
    name: "snare",
    pattern: "0000100000001000"
  },
  {
    name: "hihat",
    pattern: "1010101010101010"
  }
];

const TOGGLE_BEAT = "TOGGLE_BEAT";

export function toggleBeat(track, pattern) {
  return {
    payload: { track, pattern },
    type: TOGGLE_BEAT
  };
}

export default createReducer(initialState, {
  [TOGGLE_BEAT](state, action) {
    const newState = cloneDeep(state);
    const oldPattern = newState[action.payload.track].pattern;
    const newPatternBeat =
      oldPattern[action.payload.pattern] === "1" ? "0" : "1";

    const newPattern =
      oldPattern.substr(0, action.payload.pattern) +
      newPatternBeat +
      oldPattern.substr(action.payload.pattern + 1);
    newState[action.payload.track].pattern = newPattern;
    return newState;
  }
});
