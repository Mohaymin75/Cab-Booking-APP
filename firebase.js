import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC8naScbg17x2XrPOMTO6QuNG2HROkwiHg",
  authDomain: "cab-booking-app-4651b.firebaseapp.com",
  projectId: "cab-booking-app-4651b",
  storageBucket: "cab-booking-app-4651b.appspot.com",
  messagingSenderId: "599992822946",
  appId: "1:599992822946:web:24b57be022c4e42eeafbfb",
  measurementId: "G-0KLHVN8VF6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };