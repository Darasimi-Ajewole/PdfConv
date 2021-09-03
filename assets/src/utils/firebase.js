import { initializeApp, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { firebaseConfig, DEV } from "../config";

// DEBUGGING
// import * as firestore from "firebase/firestore"
// window.firestore = firestore;

export const initialiseFirebase = () => {
  try {
    return getApp();
  } catch (error) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    if (DEV) connectFirestoreEmulator(db, 'localhost', 8200);
    return app
  }
}


export const initialiseFirestore = () => {
  initialiseFirebase()
  return getFirestore();
}