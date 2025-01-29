
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDIvOLu6cNZS9IeLfm6pTA1luWz6NfJs9Q",
  authDomain: "react-todoapp-c6dfa.firebaseapp.com",
  projectId: "react-todoapp-c6dfa",
  storageBucket: "react-todoapp-c6dfa.firebasestorage.app",
  messagingSenderId: "164824049269",
  appId: "1:164824049269:web:0ec11e906a0180d20d7a3c",
  measurementId: "G-LMTTCRTFNR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
