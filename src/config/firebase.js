import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyDMSTyFngOzjWH_hfxhww_lsd0T6WZarkA",
  authDomain: "au-collection.firebaseapp.com",
  projectId: "au-collection",
  storageBucket: "au-collection.appspot.com",
  messagingSenderId: "704527162023",
  appId: "1:704527162023:web:242ec6f08da72e1040d982"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)


export {auth, db, storage}
