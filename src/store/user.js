import { createReducer } from "redux-create-reducer";
import firebase from "firebase/app";

import { providers } from "../firebase";

const initialState = {
  isLoading: true,
  user: null
};

const AUTHENTICATE = "AUTHENTICATE";
const LOADING_STATE = "LOADING_STATE";

export function startAuthentication(providerName) {
  return dispatch => {
    dispatch(loadingState(true));
    const provider = providers[providerName];
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(loadingState(true));
        dispatch(authenticate(user.providerData[0]));
      })
      .catch(({ message }) => {
        dispatch(loadingState(false));
        alert(
          "Sorry, something went wrong with Authentication, please try again..." +
            "Also sorry about that ugly error message, I'll improve it one day!"
        );
      });
  };
}

export function signOut() {
  return dispatch => {
    dispatch(loadingState(true));
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(authenticate(null));
        dispatch(loadingState(false));
      })
      .catch(({ message }) => {
        dispatch(authenticate(null));
        dispatch(loadingState(false));
      });
  };
}

export function authenticate(user) {
  return {
    type: AUTHENTICATE,
    payload: { user }
  };
}

export function loadingState(status) {
  return {
    type: LOADING_STATE,
    payload: status
  };
}

export default createReducer(initialState, {
  [AUTHENTICATE](state, { payload }) {
    return {
      status: "authenticated",
      user: payload.user
    };
  },
  [LOADING_STATE](state, { payload }) {
    return {
      ...state,
      isLoading: payload
    };
  }
});
