import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdJX2hu2cAmyTL7ezeYMsCSqDs2dBN1V0",
  authDomain: "registro-gastos3.firebaseapp.com",
  projectId: "registro-gastos3",
  storageBucket: "registro-gastos3.appspot.com",
  messagingSenderId: "370676180770",
  appId: "1:370676180770:web:1935a0a1601438747b277b",
  measurementId: "G-F5Z06V8DD0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);