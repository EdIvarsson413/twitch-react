// Configuracion basica de Firebase propuesta en la vinculacion del proyecto
import { initializeApp } from "firebase/app";

//Se importa la libreria de autentocacion con Firebase
import { getAuth } from 'firebase/auth'

//Libreria de Firestore
import { getFirestore } from 'firebase/firestore/lite' 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYtV6MlAQIwhIi6UyPjWbrHLTHcBMX24U",
    authDomain: "twitch-react-15aa2.firebaseapp.com",
    projectId: "twitch-react-15aa2",
    storageBucket: "twitch-react-15aa2.appspot.com",
    messagingSenderId: "275213344140",
    appId: "1:275213344140:web:16b5f9f2f7ef26024d8aa9"
};

// Inicia la app con Firebase con los sevicios requeridos
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }