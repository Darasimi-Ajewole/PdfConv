// TODO: Add dev and prod settings
// Import all firestore in dev firebase
import { initializeApp, getApp } from "firebase/app";
// import { getApp } from "firebase";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

// import * as firestore from "firebase/firestore"
// window.firestore = firestore;

var firebaseConfig = {
  // apiKey: "AIzaSyBgkYGo3fZksO5fKfcML4edkVwiVU_e_SU",
  // authDomain: "pdf-conv-3d1f5.firebaseapp.com",
  projectId: "foobar123",
  // storageBucket: "pdf-conv-3d1f5.appspot.com",
  // messagingSenderId: "1027537161135",
  // appId: "1:1027537161135:web:099ab5decbba6a8c8ffd5a"
};

export const initialiseFirebase = () => {
  try {
    return getApp();
  } catch (error) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    connectFirestoreEmulator(db, 'localhost', 8200);
    return app
  }
}


export const initialiseFirestore = () => {
  initialiseFirebase()
  return getFirestore();
}