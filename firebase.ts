import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Config
const firebaseConfig = {
  apiKey: 'AIzaSyB1bmU6FhJVdLK9xyKZMklSEBpAHMpu-uw',
  authDomain: 'moody-78a09.firebaseapp.com',
  databaseURL:
    'https://moody-78a09-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'moody-78a09',
  storageBucket: 'moody-78a09.appspot.com',
  messagingSenderId: '1027016489093',
  appId: '1:1027016489093:web:9902404c62695d8ac951ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
