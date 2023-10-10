import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCMZi51uQXrzhWy5LRbXQFRK-dXdP95Cuw",
  authDomain: "expense-tracker-b42f8.firebaseapp.com",
  projectId: "expense-tracker-b42f8",
  storageBucket: "expense-tracker-b42f8.appspot.com",
  messagingSenderId: "350149554651",
  appId: "1:350149554651:web:4491b232ae19e70af077fe"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth};
