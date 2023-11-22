import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyC9KaZKEXHvIE5eWgEDRjGCKDQf14vdecI",
  authDomain: "authmodulepab.firebaseapp.com",
  databaseURL: "https://authmodulepab-default-rtdb.firebaseio.com",
  projectId: "authmodulepab",
  storageBucket: "authmodulepab.appspot.com",
  messagingSenderId: "967300476753",
  appId: "1:967300476753:web:5d791900acdf4804996d70"
});

const FIREBASE = firebase;

export default FIREBASE;
