import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNG_BQB-YVu6smDgnMpLhWILtvQ5D2nFc",
  authDomain: "userlist-form.firebaseapp.com",
  projectId: "userlist-form",
  storageBucket: "userlist-form.appspot.com",
  messagingSenderId: "166678630254",
  appId: "1:166678630254:web:8e7f7261dcc030c7e3bb7f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
