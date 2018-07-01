import { createReducer } from "redux-create-reducer";
import cloneDeep from "lodash.clonedeep";

const initialState = {
  beats: [
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
  ],
  bpm: 100
};

const TOGGLE_BEAT = "TOGGLE_BEAT";
const UPDATE_BPM = "UPDATE_BPM";

export function toggleBeat(track, pattern) {
  return {
    payload: { track, pattern },
    type: TOGGLE_BEAT
  };
}

export function updateBpm(bpm) {
  return {
    payload: { bpm },
    type: UPDATE_BPM
  };
}

export default createReducer(initialState, {
  [UPDATE_BPM](state, { payload }) {
    return {
      ...state,
      bpm: payload.bpm
    };
  },
  [TOGGLE_BEAT](state, { payload }) {
    const newState = cloneDeep(state.beats);
    const oldPattern = newState[payload.track].pattern;
    const newPatternBeat = oldPattern[payload.pattern] === "1" ? "0" : "1";

    const newPattern =
      oldPattern.substr(0, payload.pattern) +
      newPatternBeat +
      oldPattern.substr(payload.pattern + 1);
    newState[payload.track].pattern = newPattern;
    return {
      ...state,
      beats: newState
    };
  }
});
