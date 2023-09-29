// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBTkWCPHbQrjbkp_0Urw5YjYpsuIf5XWs",
  authDomain: "email-login-cdf16.firebaseapp.com",
  projectId: "email-login-cdf16",
  storageBucket: "email-login-cdf16.appspot.com",
  messagingSenderId: "35767256453",
  appId: "1:35767256453:web:c659a558e2c2a0e3b0b0ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth