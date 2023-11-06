import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database"

firebase.initializeApp({
    apiKey: "AIzaSyAi6O2pSYAIywZi4pEcgrSBLZRJBRlhCak",
    authDomain: "pabsi-66609.firebaseapp.com",
    projectId: "pabsi-66609",
    storageBucket: "pabsi-66609.appspot.com",
    messagingSenderId: "202678796413",
    appId: "1:202678796413:web:1f2c3a2208cd0ed683f114"
})

const FIREBASE = firebase;

export default FIREBASE;