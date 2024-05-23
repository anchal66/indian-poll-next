// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyClGlChc7nh0Dmfm6dzrywI8n7-dh8kwRI",
    authDomain: "indian-poll.firebaseapp.com",
    projectId: "indian-poll",
    storageBucket: "indian-poll.appspot.com",
    messagingSenderId: "973080352665",
    appId: "1:973080352665:web:a60cdb14e340bc6533e508",
    measurementId: "G-V1R10S8VM9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
