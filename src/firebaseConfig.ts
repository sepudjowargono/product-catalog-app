import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZVNGLuBxuJeZDvfg1RYEA_FFbV5-r4Hs",
  authDomain: "product-ecommerce-app-d78f5.firebaseapp.com",
  projectId: "product-ecommerce-app-d78f5",
  storageBucket: "product-ecommerce-app-d78f5.firebasestorage.app",
  messagingSenderId: "905918287333",
  appId: "1:905918287333:web:7d9c762d9fbd76bed1330c",
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
