// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFv8hPrEjf1wDYaRAlTDfZbSlvnM8i2iE",
    authDomain: "hacknroll-94b6e.firebaseapp.com",
    projectId: "hacknroll-94b6e",
    storageBucket: "hacknroll-94b6e.appspot.com",
    messagingSenderId: "1021963263258",
    appId: "1:1021963263258:web:0fe091e1558f8c3a29a0a3",
    measurementId: "G-TD5S4XGETR"
};
// lmao loser
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

