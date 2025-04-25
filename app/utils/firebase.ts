import { initializeApp } from "firebase/app";
import {getAuth, signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_c34PtIav9L_mfJr72VwKWbITsKM94p4",
    authDomain: "plantscare-e4887.firebaseapp.com",
    projectId: "plantscare-e4887",
    storageBucket: "plantscare-e4887.firebasestorage.app",
    messagingSenderId: "679927913865",
    appId: "1:679927913865:web:42e4119976c88db9685558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber, RecaptchaVerifier };