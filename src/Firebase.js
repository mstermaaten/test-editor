import * as firebase from "firebase/app";
import firestore from "firebase/firestore";
import "firebase/auth";

const settings = { timestampsInSnapshots: true };

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABSE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SEDNER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
