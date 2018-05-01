import { createReducer } from "redux-create-reducer";
import firebase, { providers } from "../firebase";

const initialState = {
  status: "anonymous",
  user: null
};

const AUTHENTICATE = "AUTHENTICATE";
const LOADING_STATE = "LOADING_STATE";

export function startAuthentication(providerName) {
  return dispatch => {
    dispatch(loadingState());
    const provider = providers[providerName];
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(authenticate(user.providerData[0]));
      })
      .catch(({ message }) => {
        throw new Error(message);
      });
  };
}

export function authenticate(user) {
  return {
    type: AUTHENTICATE,
    payload: { user }
  };
}

export function loadingState() {
  return {
    type: LOADING_STATE
  };
}

export default createReducer(initialState, {
  [AUTHENTICATE](state, { payload }) {
    return {
      status: "authenticated",
      user: payload.user
    };
  },
  [LOADING_STATE](state) {
    return {
      ...state,
      status: "loading"
    };
  }
});
