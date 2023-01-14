// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkVE4QtZRqciNEAYgleGvNDaK9Hk5jaY0",
    authDomain: "hacknroll-2023.firebaseapp.com",
    projectId: "hacknroll-2023",
    storageBucket: "hacknroll-2023.appspot.com",
    messagingSenderId: "925852714206",
    appId: "1:925852714206:web:c831bac04852b24ea46e4f",
    measurementId: "G-F7XZ9CN11J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

