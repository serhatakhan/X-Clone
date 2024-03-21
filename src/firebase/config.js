// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Hb9rGAlg6wyTUbEkORkZAKBdB3tEL04",
  authDomain: "x-clone-44333.firebaseapp.com",
  projectId: "x-clone-44333",
  storageBucket: "x-clone-44333.appspot.com",
  messagingSenderId: "676590089411",
  appId: "1:676590089411:web:54866965a636c34901de76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase getAuth'un referansını alma
export const auth = getAuth(app)

// google sağlayıcısını kur
export const provider = new GoogleAuthProvider()

// email/password sağlayıcısı için, google da yaptığımız gibib provider kurulumu yok!