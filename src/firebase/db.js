import firebase from 'firebase';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyADN_CX3ioC1xRrPvu5cPCRcUTsA_uQxMQ",
    authDomain: "onlineokti.firebaseapp.com",
    databaseURL: "https://onlineokti-default-rtdb.firebaseio.com",
    projectId: "onlineokti",
    storageBucket: "onlineokti.appspot.com",
    messagingSenderId: "40077750048",
    appId: "1:40077750048:web:6a489894a7b4582dc57145"
  };
  // Initialize Firebase
  export const db = firebase.initializeApp(firebaseConfig).firestore();
  export const increment = firebase.firestore.FieldValue.increment(1);