// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcqD67Svg1fxFcVzY3TzQwiFbUbzYQadA",
  authDomain: "netflix-gpt-a0b46.firebaseapp.com",
  projectId: "netflix-gpt-a0b46",
  storageBucket: "netflix-gpt-a0b46.appspot.com",
  messagingSenderId: "195127816614",
  appId: "1:195127816614:web:f411d5435e61c00b55df67",
  measurementId: "G-K3YNCZYQY0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
