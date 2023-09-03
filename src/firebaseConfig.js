import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBqdc_noy8JKdDORU3sCPUdSY1kR6xqHvw",
    authDomain: "netflix-clone-1-350c9.firebaseapp.com",
    projectId: "netflix-clone-1-350c9",
    storageBucket: "netflix-clone-1-350c9.appspot.com",
    messagingSenderId: "938228391862",
    appId: "1:938228391862:web:6d49dd69840d731b056b17"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

export { auth };
export default db;

