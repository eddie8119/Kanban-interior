import {initializeApp} from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDZE5297XjsKrSTqQN8bMecu4SRqG3e1W8",
  authDomain: "vue-fire-auth-a07e3.firebaseapp.com",
  databaseURL: "https://vue-fire-auth-a07e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-fire-auth-a07e3",
  storageBucket: "vue-fire-auth-a07e3.appspot.com",
  messagingSenderId: "72244899703",
  appId: "1:72244899703:web:53c290b8844648886b7b72"
};

const firebaseApp = initializeApp(firebaseConfig);

const fbAuth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

fbAuth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(fbAuth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
}

export {
  fbAuth,
  db,
  firebaseApp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove
}
