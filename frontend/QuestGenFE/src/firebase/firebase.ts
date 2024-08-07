// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiU4S0Cjovg9DgZ46KEuJOWQaWukPUqlE",
  authDomain: "questgen-ebd70.firebaseapp.com",
  projectId: "questgen-ebd70",
  storageBucket: "questgen-ebd70.appspot.com",
  messagingSenderId: "431579386938",
  appId: "1:431579386938:web:e4bb228676949175999103",
  measurementId: "G-V6RHGNVJH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app };