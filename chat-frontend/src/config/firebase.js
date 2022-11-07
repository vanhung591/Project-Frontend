// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// refs: docs firestore: https://firebase.google.com/docs/firestore/quickstart

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2tk2d1zeela-mkNQ0d9jbvp2Fq77nY6Q",
  authDomain: "frontend-b8971.firebaseapp.com",
  projectId: "frontend-b8971",
  storageBucket: "frontend-b8971.appspot.com",
  messagingSenderId: "411612666294",
  appId: "1:411612666294:web:937d04c408da42efca0917",
  measurementId: "G-X8TT1GLS9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth()

const db = getFirestore(app);

export {analytics, provider, auth, db}