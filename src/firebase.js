// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh4hoSmVTrw4_pJwxxvXfs0eZ5lzXAsvQ",
  authDomain: "video-e73d8.firebaseapp.com",
  projectId: "video-e73d8",
  storageBucket: "video-e73d8.appspot.com",
  messagingSenderId: "996817071445",
  appId: "1:996817071445:web:839494f9ff42c87b0c53dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;
