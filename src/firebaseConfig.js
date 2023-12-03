import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB-LkW3RB8YmrYRJWYxwt7nXqtzqEDxm7c",
  authDomain: "blogproject-1ee68.firebaseapp.com",
  projectId: "blogproject-1ee68",
  storageBucket: "blogproject-1ee68.appspot.com",
  messagingSenderId: "988228553655",
  appId: "1:988228553655:web:e7efe775019dbc0f5df632",
  measurementId: "G-0FFNQHS1B4"
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);