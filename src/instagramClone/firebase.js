import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBNIYfmFhvTE8HVw4chNSSq6nFuq3CCzjo",
    authDomain: "instagram-clone-822a1.firebaseapp.com",
    projectId: "instagram-clone-822a1",
    storageBucket: "instagram-clone-822a1.appspot.com",
    messagingSenderId: "234658217976",
    appId: "1:234658217976:web:4b8eaeccb5e9ba296ce00d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();