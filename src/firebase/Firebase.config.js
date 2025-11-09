// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT-MlRrvl8JtIbxlmu7t8i9i0DhVwzBU0",
  authDomain: "intertrade-nexus.firebaseapp.com",
  projectId: "intertrade-nexus",
  storageBucket: "intertrade-nexus.firebasestorage.app",
  messagingSenderId: "622114741945",
  appId: "1:622114741945:web:b7179dacd76b7a3439c568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app