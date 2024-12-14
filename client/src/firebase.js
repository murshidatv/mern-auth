
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fbc5e.firebaseapp.com",
  projectId: "mern-auth-fbc5e",
  storageBucket: "mern-auth-fbc5e.firebasestorage.app",
  messagingSenderId: "521382705317",
  appId: "1:521382705317:web:c09d3fe96e4b18af52754c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




