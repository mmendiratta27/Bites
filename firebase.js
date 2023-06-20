import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNWIUGXSJLlhlt0sow6qwjciNGXj4Bro4",
  authDomain: "messages-5fa5c.firebaseapp.com",
  databaseURL: "https://messages-5fa5c-default-rtdb.firebaseio.com",
  projectId: "messages-5fa5c",
  storageBucket: "messages-5fa5c.appspot.com",
  messagingSenderId: "24433986380",
  appId: "1:24433986380:web:4afac8aaa9e41b368e1de9",
  measurementId: "G-D860T2Y4BJ"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };