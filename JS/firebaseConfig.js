import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCyJcb7WnAzN6jkc2_pYwibwiAGSqeWyqw",
    authDomain: "mario-game-b25c1.firebaseapp.com",
    projectId: "mario-game-b25c1",
    storageBucket: "mario-game-b25c1.appspot.com",
    messagingSenderId: "879288682984",
    appId: "1:879288682984:web:ad645483488c1fac183c5d",
    measurementId: "G-58N8KJGW1V"
};
  // Exportar o objeto de configuração do Firebase
export { firebaseConfig, getAuth, createUserWithEmailAndPassword, };