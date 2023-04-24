import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAik5XkZI8N6RTnZi0UqtYvVytl3FvC250",
  authDomain: "chatcomponent-6456d.firebaseapp.com",
  projectId: "chatcomponent-6456d",
  storageBucket: "chatcomponent-6456d.appspot.com",
  messagingSenderId: "853780757593",
  appId: "1:853780757593:web:9a7b1e35cd8e6007ce8548"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()