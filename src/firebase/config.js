// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//Dev/Prod
/*
const firebaseConfig = {
  apiKey: "AIzaSyC-TXe5_YUTxDeQtsDcqT7ZLHCslDAnhew",
  authDomain: "react-curso-udemy-4ff31.firebaseapp.com",
  projectId: "react-curso-udemy-4ff31",
  storageBucket: "react-curso-udemy-4ff31.appspot.com",
  messagingSenderId: "829719518824",
  appId: "1:829719518824:web:67e34f62a2356f338d65dd"
};*/

const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_DATABASEURL,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
VITE_MEASUREMENTID,
} = getEnvironments();
//console.log(env);

// console.log(import.meta.env);
/*
const firebaseConfig = {
  apiKey: "AIzaSyBhx8w1AoRK9-UzJvV_kICv8nuakjvRjJc",
  authDomain: "mimapa-262204.firebaseapp.com",
  databaseURL: "https://mimapa-262204.firebaseio.com",
  projectId: "mimapa-262204",
  storageBucket: "mimapa-262204.appspot.com",
  messagingSenderId: "736272488733",
  appId: "1:736272488733:web:c0f9619c4b8957d9f769f4",
  measurementId: "G-J2R3D95N7V"
};*/

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID
};

console.log(firebaseConfig);

// Initialize Firebase
export const Firebaseapp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(Firebaseapp);
export const FirebaseDB = getFirestore(Firebaseapp);