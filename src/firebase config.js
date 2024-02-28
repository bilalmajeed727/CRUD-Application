import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId:"crud-application-e9cb8",
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  appId:import.meta.env.VITE_APP_ID,


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)