// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc,setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3bZVbmWN6uqLaiuvdaZ_rAcfoCAd_LdY",
  authDomain: "walletwise-jsx-eef25.firebaseapp.com",
  projectId: "walletwise-jsx-eef25",
  storageBucket: "walletwise-jsx-eef25.appspot.com",
  messagingSenderId: "192473497513",
  appId: "1:192473497513:web:bec2a7a2e7f17d4b240eb8",
  measurementId: "G-CB0438GHYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc}
