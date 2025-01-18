// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHLMw8cG7MDitM2ibrwYlMFQSv6-pe_qU",
  authDomain: "cutecharms-fc7cc.firebaseapp.com",
  projectId: "cutecharms-fc7cc",
  storageBucket: "cutecharms-fc7cc.firebasestorage.app",
  messagingSenderId: "257518428053",
  appId: "1:257518428053:web:a86e9dd7a152d9047ca09c",
  measurementId: "G-5Y694T9080",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
