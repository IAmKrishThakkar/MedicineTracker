
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBY40dad93gSTR5zK5eov1yQey_-p3dSyI",
  authDomain: "meditracker-d16eb.firebaseapp.com",
  projectId: "meditracker-d16eb",
  storageBucket: "meditracker-d16eb.firebasestorage.app",
  messagingSenderId: "777111129958",
  appId: "1:777111129958:web:5e620309c9b9a4f546c2a7",
  measurementId: "G-JB537ES0VB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
//hell