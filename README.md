Firebase setup: 
create a config directory in the src directory: /src/config

create a file called .firebaseSetup.ts in the config directory /src/config/firebaseSetup.ts

setup firebase project and enable email/password documentation

``
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
apiKey: "AIzaSyCrzdAusLqseoWLKasvnR_tH7S0x7x1BF0",
authDomain: "hacknroll2023-b20af.firebaseapp.com",
projectId: "hacknroll2023-b20af",
storageBucket: "hacknroll2023-b20af.appspot.com",
messagingSenderId: "548716422106",
appId: "1:548716422106:web:0613ae5fe27ed6a7a656e3",
measurementId: "G-24KQPS1PVX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
``


