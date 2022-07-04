import { initializeApp, getApp } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  FirebaseFirestore,
} from "firebase/firestore";
import { firebaseConfig, DEV } from "../config";

// DEBUGGING
// import * as firestore from "firebase/firestore"
// window.firestore = firestore;

export const initialiseFirebase = (): FirebaseApp => {
  try {
    return getApp();
  } catch (error) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    if (DEV) connectFirestoreEmulator(db, "localhost", 8200);
    return app;
  }
};

export const initialiseFirestore = (): FirebaseFirestore => {
  initialiseFirebase();
  return getFirestore();
};
