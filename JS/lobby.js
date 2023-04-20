import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";

const useruid = sessionStorage.getItem("useruid");

if(useruid == null){

  location.href = "https://project-mario-game-by-victor-lis.netlify.app/"

}

console.log(useruid)

const app = initializeApp(firebaseConfig);

const database = getDatabase();

// Referência ao nó de usuário correspondente ao useruid
const userRef = ref(database, `usuarios/${useruid}`);

// Realizar o get no nó de usuário
get(userRef)  
  .then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log(userData);
    } else {
      console.log("Usuário não encontrado");
    }
  })
  .catch((error) => {
    console.log(error);
  });