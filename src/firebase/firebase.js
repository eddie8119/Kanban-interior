import { initializeApp } from 'firebase/app'
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
  arrayRemove,
} from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

var firebaseConfig = {
  apiKey: 'AIzaSyBjYSRdoP0-MLmEumELc5FUn91vfB5hl_I',
  authDomain: 'interior-construction-helper.firebaseapp.com',
  projectId: 'interior-construction-helper',
  storageBucket: 'interior-construction-helper.appspot.com',
  messagingSenderId: '458434206018',
  appId: '1:458434206018:web:9e41b80ef50ab7cd6650db',
}

const firebaseApp = initializeApp(firebaseConfig)

const fbAuth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

fbAuth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      fbAuth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
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
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
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
  arrayRemove,
}
