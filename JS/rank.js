import { firebaseConfig } from "./firebaseConfig.js";
import { getDatabase, ref, get, } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

const rank = document.getElementById("rank")

let rankType = "coins"

const app = initializeApp(firebaseConfig);

const database = getDatabase();

// Referência para a tabela "coins" do Realtime Database
const rankRef = ref(database, `ranks/`);

let datas = []

  window.onload = loadRank()

  async function loadRank(){

    await getDatas()

    if(rankType == "coins"){

        rank.innerHTML = ""

        datas.coins.map(data => {

            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            let p = document.createElement("p")

            rank.appendChild(div)
            div.appendChild(h3)
            div.appendChild(p)

            h3.innerText = data.username
            p.innerText = data.pontos

        })

    }

  }

  async function getDatas(){

    await get(rankRef)  
    .then((snapshot) => {
  
      if(snapshot.exists()){
          datas = snapshot.val()
      }
    })

  }

  setInterval(async () => {
    loadRank()
  }, 1500);