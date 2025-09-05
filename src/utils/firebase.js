// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfGLCaJVqBxMTyn6a6as_fHljHGFBiiTY",
  authDomain: "netflixgpt-2041c.firebaseapp.com",
  projectId: "netflixgpt-2041c",
  storageBucket: "netflixgpt-2041c.firebasestorage.app",
  messagingSenderId: "800467927061",
  appId: "1:800467927061:web:7f3190c814ab5828dcce1c",
  measurementId: "G-ZWFW9H67EP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
