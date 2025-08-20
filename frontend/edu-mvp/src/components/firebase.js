// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1m5bFTwK9hAo2efvftmw9VtRTSKTILZw",
  authDomain: "educar-f90be.firebaseapp.com",
  projectId: "educar-f90be",
  storageBucket: "educar-f90be.firebasestorage.app",
  messagingSenderId: "506949906552",
  appId: "1:506949906552:web:ea3efc76b4ea8cccbf3d8d",
  measurementId: "G-NLE04JFDZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };