// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDL7bvslUkTDcfP7AcMTzEwDFMgLAw9RcY",
//   authDomain: "final-project-food-b0e99.firebaseapp.com",
//   projectId: "final-project-food-b0e99",
//   storageBucket: "final-project-food-b0e99.firebasestorage.app",
//   messagingSenderId: "491514737801",
//   appId: "1:491514737801:web:ed5276de6679c1ff4cc258"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);