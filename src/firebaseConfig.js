import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpjdFIwOHRmyVTTRVDGI34xtLd4Sw9oEI",
  authDomain: "projectrmutlfoodorderingsystem.firebaseapp.com",
  databaseURL: "https://projectrmutlfoodorderingsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectrmutlfoodorderingsystem",
  storageBucket: "projectrmutlfoodorderingsystem.firebasestorage.app",
  messagingSenderId: "332383596728",
  appId: "1:332383596728:web:7d36cda676c639e869844d",
  measurementId: "G-DDHH23G6RB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
