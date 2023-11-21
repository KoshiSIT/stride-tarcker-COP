// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAis7KTI5_51XolYCFLPa_LHxSU2-Zlp4Q",
  authDomain: "stride-tracker.firebaseapp.com",
  projectId: "stride-tracker",
  storageBucket: "stride-tracker.appspot.com",
  messagingSenderId: "787999785519",
  appId: "1:787999785519:web:ff5311c9b07a719e87bcda",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const STORAGE_REF = ref(
  FIREBASE_STORAGE,
  "gs://stride-tracker.appspot.com/"
);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
