import * as firebase from "firebase";
import firestore from "firebase/firestore";
import "firebase/auth";

const settings = { timestampsInSnapshots: true };

var config = {
  apiKey: "AIzaSyCBQDw4Lo_SuUa4RGkvo4x8PCnXZtPfTmg",
  authDomain: "tlm-database.firebaseapp.com",
  databaseURL: "https://tlm-database.firebaseio.com",
  projectId: "tlm-database",
  storageBucket: "",
  messagingSenderId: "1080167438260",
  appId: "1:1080167438260:web:c348eb9cea6070e0"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
