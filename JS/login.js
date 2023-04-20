import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const title = document.getElementById("title")
const tradePageA = document.getElementById("tradePage")
const buttonForm = document.getElementById("button")
const usernameInput = document.getElementById("usernameInput")
const emailInput = document.querySelector("#emailInput")
const passwordInput = document.querySelector("#passwordInput")

let userID = ""

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let page = "cadastro"; 

location == "http://127.0.0.1:5500/"? setLayout(): ""
location == "http://localhost:5500/"? setLayout(): ""

console.log(location)

 const app = initializeApp(firebaseConfig);

// Obter uma referência para o nó "usuarios" do banco de dados
const database = getDatabase();

// Obter o objeto de autenticação do Firebase
const auth = getAuth(app);

// Adicionar um listener de evento para o evento "submit" do formulário

if(location.href == "http://127.0.0.1:5500/" || location.href == "http://localhost:5500/" || location.href == "https://project-mario-game-by-victor-lis.netlify.app/"){

  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário
    
    // Obter os valores do nome de usuário e senha do formulário
    const email = document.querySelector('#email').value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector('#password').value;
    
    // Criar o usuário com o email e senha fornecidos
    
    if(username == "" && page == "cadastrado"){
      
      alert("Preencha o seu nome de usuário!")
      return
      
    }
    
    if(page == "cadastro"){
      
      await cadastrar(auth, email, password, username)
      
    }else if(page == "login"){
      
      await logar(auth, email, password)
      
    }

  });

}

async function cadastrar(auth, email, password, username) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Obter o objeto do usuário criado
      const user = userCredential.user;
      userID = userCredential.user.uid;
      sessionStorage.setItem("useruid", userID)
      console.log(userID)

      // Criar um objeto com os dados do usuário
      const usuario = {
        email: user.email,
        username: username,
        pontos: 0,
        habilidades: "",
        habilidadesEmUso: "",
        melhorTempo: "00:00:00",
        coins: 0,
        posicaoNoRank: "",
      };

      // Salvar o objeto do usuário no banco de dados
      const uid = user.uid;
      const usuarioRef = ref(database, `usuarios/${uid}`);
      set(usuarioRef, usuario)
        .then(() => {
          alert("Usuário registrado com sucesso!");
          page = "lobby"
          console.log(page)
          location.href = "./pages/lobby.html"
        })
        .catch((error) => {
          alert(error)
        });
    })
    .catch((error) => {
      alert(error)
    });
    localStorage.setItem("useruid", userID)
}


async function logar(auth, email, password){

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Obter o objeto do usuário autenticado
    const user = userCredential.user;
    userID = userCredential.user.uid;
    sessionStorage.setItem("useruid", userID)
    console.log(userID)
    console.log("Usuário logado com sucesso:");
    page = "lobby"
    console.log(page)
    location.href = "./pages/lobby.html"
  })
  .catch((error) => {
    console.error("Erro ao fazer login: ");
  });
  localStorage.setItem("useruid", userID) 
}



function setLayout(){

    console.log(page)

    if(page == "login"){

        usernameInput.style.display = "none"
        tradePageA.innerText = "Cadastre-se aqui!"
        buttonForm.innerText = "Entrar"

    }else if(page == "cadastro"){

        usernameInput.style.display = "inherit"
        tradePageA.innerText = "Logue aqui!"
        buttonForm.innerText = "Cadastrar"

    }

    page == "login" || "cadastro"? title.innerText = page.toUpperCase(): ""

}

if(location.href == "http://127.0.0.1:5500/" || location.href == "http://localhost:5500/" || location.href == "https://project-mario-game-by-victor-lis.netlify.app/"){

  document.getElementById("tradePage").addEventListener("click", () => {
  
  if(page == "login"){

      page = "cadastro"

  }else{

      page = "login"

  }

  setLayout()

  })
  
}