import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWnnhwyQyNgnnFD87TCm6BYC2Cb4akM3Y",
  authDomain: "exchangeratecs-fe146.firebaseapp.com",
  projectId: "exchangeratecs-fe146",
  storageBucket: "exchangeratecs-fe146.appspot.com",
  messagingSenderId: "277748574963",
  appId: "1:277748574963:web:397c095f6bf3553912a586"
};

const app = initializeApp(firebaseConfig);
export const firestore  = getFirestore(app);



