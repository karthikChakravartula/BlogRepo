// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3434343426jrOrEBAGDhUG0psMLTkISYg9wuuT3U",
  authDomain: "react-firebase-77930f.firebaseapp.com",
  projectId: "react-firebase-77930f",
  storageBucket: "react-firebase-77390f.firebasestorage.app",
  messagingSenderId: "238814434308534",
  appId: "1:238817008534:web:43434343434343"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db= getFirestore(app);