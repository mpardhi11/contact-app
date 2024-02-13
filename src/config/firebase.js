// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey = import.meta.env.VITE_API_APIKEY;
const authDomain = import.meta.env.VITE_API_AUTHDOMAIN;
const projectId = import.meta.env.VITE_API_PROJECTID;
const storageBucket = import.meta.env.VITE_API_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_API_MESSAGINGSENDERID;
const appId = import.meta.env.VITE_API_APPID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
