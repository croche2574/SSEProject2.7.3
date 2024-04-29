// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDkLhaV2ASHVRLvxbB-2XewjamIx_5FZDg",
    authDomain: "sse-quiz-app.firebaseapp.com",
    databaseURL: "https://sse-quiz-app-default-rtdb.firebaseio.com",
    projectId: "sse-quiz-app",
    storageBucket: "sse-quiz-app.appspot.com",
    messagingSenderId: "535588940107",
    appId: "1:535588940107:web:8920a82b48f3893d6b20ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;