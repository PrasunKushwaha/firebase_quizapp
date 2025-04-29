// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";  
import { collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7NXcTWY0cSc6P77eGVA1tvIZQeU7zuCY",
  authDomain: "react-quizapp-d1082.firebaseapp.com",
  databaseURL: "https://react-quizapp-d1082-default-rtdb.firebaseio.com",
  projectId: "react-quizapp-d1082",
  storageBucket: "react-quizapp-d1082.firebasestorage.app",
  messagingSenderId: "79201047621",
  appId: "1:79201047621:web:11eae6b1f650db056a7f2c",
  measurementId: "G-RYRZKFDYFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);