// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw0l0iuZMJHXCbXQ74vFwNFWMe4uc6BRA",
    authDomain: "budgettracker-a5c26.firebaseapp.com",
    projectId: "budgettracker-a5c26",
    storageBucket: "budgettracker-a5c26.firebasestorage.app",
    messagingSenderId: "741269096536",
    appId: "1:741269096536:web:dadb363db58858e425e22d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
