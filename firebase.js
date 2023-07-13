import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, persistentLocalCache  } from 'firebase/firestore';
import { initializeAuth, getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import Constants from "expo-constants"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxvbAvtRB3ah-2-hi0jMTZI9jXv-K1fk4",
  authDomain: "ssu1-1518c.firebaseapp.com",
  projectId: "ssu1-1518c",
  storageBucket: "ssu1-1518c.appspot.com",
  messagingSenderId: "110150881079",
  appId: "1:110150881079:web:f22db7d7441d23ee70d4b2",
  measurementId: "G-FFEPMHPQ05"
};


const app = firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.functions();
const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});

const db = initializeFirestore(app, {experimentalForceLongPolling: true});
//db.enablePersistence();

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig)
}

export { db, auth, firebase };
//setPersistence(auth, inMemoryPersistence)