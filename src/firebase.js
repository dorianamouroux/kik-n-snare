import firebase from "firebase";

import { loadingState, authenticate } from "./store/user";

var config = {
  apiKey: "AIzaSyApEOPNZoZkZU19UVRGQUETtLfDBAGtrrY",
  authDomain: "kik-n-snare.firebaseapp.com",
  databaseURL: "https://kik-n-snare.firebaseio.com",
  projectId: "kik-n-snare"
};

export const providers = {
  google: new firebase.auth.GoogleAuthProvider()
};

function initFirebase(store) {
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(user => {
    store.dispatch(loadingState(false));
    store.dispatch(authenticate(user));
  });
}

export default initFirebase;
