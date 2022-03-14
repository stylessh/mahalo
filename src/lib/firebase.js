import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEpAZn7MjIKMXyr5sgPRkdDpOfqOlOnIo",
  authDomain: "mahalotv-87e01.firebaseapp.com",
  projectId: "mahalotv-87e01",
  storageBucket: "mahalotv-87e01.appspot.com",
  messagingSenderId: "63977324278",
  appId: "1:63977324278:web:c179d2c385bb2ae63336d7",
  measurementId: "G-96FNK9YHKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
