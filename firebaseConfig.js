// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKUQBIOuVR5_m4-B9A-LirHyx6cWA3Z_g",
  authDomain: "estoquenutricao-7ef64.firebaseapp.com",
  projectId: "estoquenutricao-7ef64",
  storageBucket: "estoquenutricao-7ef64.firebasestorage.app",
  messagingSenderId: "633134351070",
  appId: "1:633134351070:web:2251c770af250bfd7cf84f",
  measurementId: "G-CTYBWTEJWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);