import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBusnTUckWXpb0x3O4ZIqGZGTctm9B0Rkw",
  authDomain: "ecommer-c7765.firebaseapp.com",
  databaseURL: "https://ecommer-c7765-default-rtdb.firebaseio.com",
  projectId: "ecommer-c7765",
  storageBucket: "ecommer-c7765.appspot.com",
  messagingSenderId: "4855435544",
  appId: "1:4855435544:web:bd358ff64aee801863ce6d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
