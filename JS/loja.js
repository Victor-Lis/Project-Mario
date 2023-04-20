import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, update, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";

const coins = document.getElementById("coins")
const buy1 = document.getElementById("1")
const buy2 = document.getElementById("2")
const buy3 = document.getElementById("3")

const useruid = await sessionStorage.getItem("useruid");

if(useruid == null){

    location.href = "https://project-mario-game-by-victor-lis.netlify.app/"
  
}

const app = initializeApp(firebaseConfig);

// Obter uma referência para o nó "usuarios" do banco de dados
const database = getDatabase();

const userRef = ref(database, `usuarios/${useruid}`);
let userData;
let habilidades = []

await get(userRef).then((snapshot) => {

    if(snapshot.exists()){
        userData = snapshot.val()
        console.log(userData.habilidades == "")

        if(userData.habilidades != ""){

            userData.habilidades.map(value => {

                if(value == 1){
    
                    buy1.style.display = "none"
    
                }
    
                if(value == 2){
    
                    buy2.style.display = "none"
    
                }
    
            })
            coins.innerText = userData.coins

        }

    }else{
        console.log("Usuário não encontrado");
    }

})

async function getDatas(){

    await get(userRef).then((snapshot) => {

        if(snapshot.exists()){
            userData = snapshot.val()
                if(userData.habilidades != ""){

                    userData.habilidades.map(value => {
    
                        if(value == 1){

                            buy1.style.display = "none"

                        }

                        if(value == 2){

                            buy2.style.display = "none"

                        }

                        if(value == 3){

                            buy3.style.display = "none"

                        }

                    })
                    coins.innerText = userData.coins

          }else{
            console.log("Usuário não encontrado");
          }
        }

    })

}

buy1.addEventListener("click", () => {

    comprarHabilidade(1)

})

buy2.addEventListener("click", () => {

    comprarHabilidade(2)

})

buy3.addEventListener("click", () => {

    comprarHabilidade(3)

})


async function comprarHabilidade(habilidadeEscolhida){

    let jaTem = false;
    console.log(userData)

    if(userData.habilidades != undefined && userData.habilidades.length){

        console.log(userData.habilidades)
        userData.habilidades.map(value => {

            if(!jaTem){

                console.log(value)
                console.log(habilidadeEscolhida)
                console.log(value == habilidadeEscolhida)

                if(value == habilidadeEscolhida){

                    jaTem = true;

                }

            }

        })

    }
    if(!jaTem){
        
        if(habilidadeEscolhida == 1){
            
        if(userData.coins >= 50){

            userData.habilidades = Object.values(userData.habilidades);
            userData.habilidades.push(1)
            userData.coins = userData.coins - 50
            userData.habilidades.sort((a, b) => a.pontos - b.pontos);
            console.log(userData)

        }else{

            alert("Você não tem grana o suficiente!")
            
        }
        
        }else if(habilidadeEscolhida == 2){

            if(userData.coins >= 2500){

                userData.habilidades = Object.values(userData.habilidades);
                userData.habilidades.push(2)
                userData.coins = userData.coins - 2500
                userData.habilidades.sort((a, b) => a.pontos - b.pontos);
                console.log(userData)

            }else{
            
                alert("Você não tem grana o suficiente!")

            }

        }else if(habilidadeEscolhida == 3){

            if(userData.coins >= 10000){

                userData.habilidades = Object.values(userData.habilidades);
                userData.habilidades.push(3)
                userData.coins = userData.coins - 10000
                userData.habilidades.sort((a, b) => a.pontos - b.pontos);
                console.log(userData)

            }else{
            
                alert("Você não tem grana o suficiente!")

            }

        }

        let newRef = ref(database, `usuarios/${useruid}/`)
        await update(newRef, userData)
        .then(() => {
          console.log("Dados atualizados com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar os dados:", error);
        });

    }else{

        alert("Você já tem esta habilidade: "+habilidadeEscolhida)

    }
}

getDatas()
setInterval(() => {getDatas()}, 1500)