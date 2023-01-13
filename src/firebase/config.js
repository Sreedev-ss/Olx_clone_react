import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyClcAbYT1hcHX5l7Q3rRu-ReNndvOXxiuo",
    authDomain: "olx-clone---react.firebaseapp.com",
    projectId: "olx-clone---react",
    storageBucket: "olx-clone---react.appspot.com",
    messagingSenderId: "107741067044",
    appId: "1:107741067044:web:e5358c839b202f1b7ba5b1",
    measurementId: "G-5MR1WLXWZS"
  };

  export const Firebase = initializeApp(firebaseConfig);
  export const db = getFirestore(Firebase);