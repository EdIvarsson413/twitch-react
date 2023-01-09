// Configuracion basica de Firebase propuesta en la vinculacion del proyecto
import { initializeApp } from "firebase/app";

//Este archivo tambien puede funcionar como controlador de Firebase sin necesidad de usar más archivos
import {getAuth, } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYtV6MlAQIwhIi6UyPjWbrHLTHcBMX24U",
    authDomain: "twitch-react-15aa2.firebaseapp.com",
    projectId: "twitch-react-15aa2",
    storageBucket: "twitch-react-15aa2.appspot.com",
    messagingSenderId: "275213344140",
    appId: "1:275213344140:web:16b5f9f2f7ef26024d8aa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}