import firebase from "firebase";

var config = {
  apiKey: "AIzaSyApEOPNZoZkZU19UVRGQUETtLfDBAGtrrY",
  authDomain: "kik-n-snare.firebaseapp.com",
  databaseURL: "https://kik-n-snare.firebaseio.com",
  projectId: "kik-n-snare"
};

firebase.initializeApp(config);

export const providers = {
  google: new firebase.auth.GoogleAuthProvider()
};

export default firebase;
