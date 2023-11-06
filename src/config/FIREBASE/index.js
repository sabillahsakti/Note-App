import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database"

firebase.initializeApp({
    apiKey: "AIzaSyAi6O2pSYAIywxxxxxx",
    authDomain: "xxxxx.firebaseapp.com",
    projectId: "xxxx-66609",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "2026787xxxxx",
    appId: "1:202678796413:web:1f2c3a2208cxxxx"
})

const FIREBASE = firebase;

export default FIREBASE;
