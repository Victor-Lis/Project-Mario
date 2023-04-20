import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get, push, set, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";

const useruid = await sessionStorage.getItem("useruid");

if(useruid == null){

  location.href = "https://project-mario-game-by-victor-lis.netlify.app/"

}

const app = initializeApp(firebaseConfig);

const database = getDatabase();

// Referência ao nó de usuário correspondente ao useruid
const userRef = ref(database, `usuarios/${useruid}`);
const rankRef = ref(database, `ranks/`);

let userData;
let rankData = [];
let habilidades = []
let duplicacao = false
const AllTimeScore = document.getElementById("all-time-score")
const bestTime = document.getElementById("best-time")
const coins = document.getElementById("coins")
const rankPosition = document.getElementById("rankPosition")

await get(userRef)  
  .then((snapshot) => {
    if(snapshot.exists()){
      userData = snapshot.val()
      console.log(userData);
      AllTimeScore.innerText = userData.pontos
      bestTime.innerText = userData.melhorTempo
      coins.innerText = userData.coins
      if(userData.posicaoNoRank != ""){

        rankPosition.innerText = `${userData.posicaoNoRank}°`

      }else{

        rankPosition.innerText = `Não está`

      }
      habilidades = Object.values(userData.habilidades)
      habilidades.map(value => {

        if(value == 3){

          duplicacao = true;

        }

      })
    }else{
      console.log("Usuário não encontrado");
    }
  })
  .catch((error) => {
    console.log(error);
  });

await get(rankRef)  
  .then((snapshot) => {

    if(snapshot.exists()){
        rankData = snapshot.val()
        rankData = rankData.coins
        console.log(rankData)
    }
  })

const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const bricks = document.querySelector(".bricks-grid")

const sky = document.querySelector(".sky")
const cloud1 = document.querySelector(".clouds1")
const cloud2 = document.querySelector(".clouds2")
const cloud3 = document.querySelector(".clouds3")
const cloud4 = document.querySelector(".clouds4")
const cloud5 = document.querySelector(".clouds5")
const cloud6 = document.querySelector(".clouds6")

const timer = document.getElementById("timer")
const score = document.getElementById("score")

const endGame = document.getElementById("end-game")
const buttonStart = document.getElementById("button-start")

const passadas = {

  passadasBrick: 0,
  coins: 0,

}

const tracks = {

  pipeTrack: 0,
  gameTrack: 0,
  jumpTrack: 1,
  startGameTrack: 1,
  brickTrack: Math.floor(Math.random() * 5) + 1,

}

var sec = 0, min = 0, hr = 0, limite, interval, play_sound, track = 0, pontos = 0;
score.innerText = `Score: ${pontos}`

setInterval(1, watch())

function twoDigits(digit){

    if(digit < 10){

        return("0"+digit) 

    }

    if(digit > 9){

        return(digit)

    }

}

function watch(){

  sec++

   if(sec == 60){

      sec = 0
      min++

   }

   if(min == 60){

      min = 0
      hr++

   }

    timer.innerHTML = twoDigits(hr)+":"+twoDigits(min)+":"+twoDigits(sec);

}  




document.addEventListener("click", async function(e){

  // console.log(tracks.startGameTrack)

  if(tracks.gameTrack == 1 && tracks.startGameTrack == 0){

    if(tracks.jumpTrack == 0){

      mario.classList.add("mario-animation")
      if(duplicacao){

        pontos = pontos + 2
        passadas.coins = passadas.coins + 2

      }else{

        pontos++
        passadas.coins++

      }
      
      score.innerText = `Score: ${pontos}`
      tracks.jumpTrack = 1

    } 

      setTimeout(() => {

          mario.classList.remove("mario-animation")     

      },500)

      setTimeout(() => {

          tracks.jumpTrack = 0    

      }, 1250)
  }

})

document.addEventListener("keydown", async function(e){

    if(tracks.gameTrack == 1 && tracks.startGameTrack == 0){

      if(e.key == "W".toLowerCase()){

          if(tracks.jumpTrack == 0){

            mario.classList.add("mario-animation")
            if(duplicacao){

              pontos = pontos + 2
              passadas.coins = passadas.coins + 2

            }else{

              pontos++
              passadas.coins++

            }
            
            score.innerText = `Score: ${pontos}`
            tracks.jumpTrack = 1

          } 

            setTimeout(() => {

              mario.classList.remove("mario-animation")      

            },500)

            setTimeout(() => {

              tracks.jumpTrack = 0    

            }, 1250)

      }  

    }

})

document.getElementById("button-start").addEventListener("click", () => {

  startGame()
  setTimeout(() => {

    tracks.startGameTrack = 0

  }, 200)

})

function startGame(){

  interval = setInterval(watch, 1000)

  tracks.gameTrack = 1 
  tracks.jumpTrack = 0

  endGame.style.display = "none"

  mario.src="../Imagens/mario.gif"
  bricks.classList.add("bricks-animation")
  pipe.classList.add("pipe-animation")

  cloud1.classList.add("cloud-movement1")
  cloud2.classList.add("cloud-movement2")
  cloud3.classList.add("cloud-movement3")
  cloud4.classList.add("cloud-movement4")
  cloud5.classList.add("cloud-movement5")
  cloud6.classList.add("cloud-movement6")

  sky.style.display = "inherit"

}

setInterval( function(){

  if(tracks.gameTrack == 1){

    var topPersonagem = window.getComputedStyle(mario).bottom.replace('px', '')
    //var topBrick = window.getComputedStyle(bricks).bottom.replace('px', '')
    var leftBrick = window.getComputedStyle(bricks).left.replace('px', '')
    var leftPipe = window.getComputedStyle(pipe).left.replace('px', '')
    var leftCloud1 = window.getComputedStyle(cloud1).left.replace('px', '')
    var leftCloud2 = window.getComputedStyle(cloud2).left.replace('px', '')
    var leftCloud3 = window.getComputedStyle(cloud3).left.replace('px', '')
    var leftCloud4 = window.getComputedStyle(cloud4).left.replace('px', '')
    var leftCloud5 = window.getComputedStyle(cloud5).left.replace('px', '')
    var leftCloud6 = window.getComputedStyle(cloud6).left.replace('px', '')

    if(leftPipe < 20){

      if(tracks.pipeTrack == 0){

        passadas.passadasBrick++

        tracks.pipeTrack = 1
      }

    }

    if(leftPipe > 20){

      if(tracks.pipeTrack == 1){

        tracks.pipeTrack = 0

      }
  
    }

    if(passadas.passadasBrick >= tracks.brickTrack){

       tracks.brickTrack = tracks.brickTrack*2

       if(tracks.brickTrack >= 50){

        tracks.brickTrack = Math.floor(Math.random() * 10) + 5
        passadas.passadasBrick = Math.floor(Math.random() * 5)

       }

      //  console.log(`BrickTrack: ${tracks.brickTrack}`)
      //  console.log(`Passadas: ${passadas.passadasBrick}`)

       bricks.style.display = "grid"

       setTimeout(() => {

        if(tracks.gameTrack == 1){ 

         bricks.style.display = "none"   
        
        }

       },3000)

    }

    if(topPersonagem < 10 && leftPipe > 0 && leftPipe < 95 || topPersonagem > 10 && leftBrick > -50 && leftBrick < 25 && tracks.gameTrack == 1){

      som()
      tracks.gameTrack = 0

      mario.src = "../Imagens/game-over.png"
      mario.style.width = "60px"
      mario.style.height = "65px"

      mario.classList.add("game-over-animation")
      bricks.classList.remove("bricks-animation")
      pipe.classList.remove("pipe-animation")

      cloud1.classList.remove("cloud-movement1")
      cloud2.classList.remove("cloud-movement2")
      cloud3.classList.remove("cloud-movement3")
      cloud4.classList.remove("cloud-movement4")
      cloud5.classList.remove("cloud-movement5")
      cloud6.classList.remove("cloud-movement6")
      clearInterval(interval)
    
      setTimeout(async () => {

        let coins;

        if(duplicacao){

          coins = passadas.coins / 2.5;
          coins = parseInt(coins)
          passadas.coins = 0

        }else{

          coins = passadas.coins / 5;
          coins = parseInt(coins)
          passadas.coins = 0

        }
        console.log("Coins: "+coins)

        mario.style.display = "none"
        userData.pontos = userData.pontos + pontos;
        AllTimeScore.innerText = userData.pontos;
        userData.coins = userData.coins + coins;
        this.coins.innerText = userData.coins

        const setUserRefCoins = ref(database, `usuarios/${useruid}/coins`)
        await set(setUserRefCoins, userData.coins)

        if(hr < 10){

          hr = `0${hr}`

        }
        if(min < 10){

          min = `0${min}`

        }
        if(sec < 10){

          sec = `0${sec}`

        }

        if(hr > parseInt(userData.melhorTempo[0]+userData.melhorTempo[1]) || hr == parseInt(userData.melhorTempo[0]+userData.melhorTempo[1]) && min > parseInt(userData.melhorTempo[3]+userData.melhorTempo[4]) || hr == parseInt(userData.melhorTempo[0]+userData.melhorTempo[1]) && min == parseInt(userData.melhorTempo[3]+userData.melhorTempo[4]) && sec > parseInt(userData.melhorTempo[6]+userData.melhorTempo[7])){

          userData.melhorTempo = hr+":"+min+":"+sec
          bestTime.innerText = userData.melhorTempo

          const setUserRefTime = ref(database, `usuarios/${useruid}/melhorTempo`)

          await set(setUserRefTime, userData.melhorTempo)

        }

        const setUserRefPoints = ref(database, `usuarios/${useruid}/pontos`)

        await set(setUserRefPoints, userData.pontos)

      }, 1500);

      setTimeout(() => {

        setNewRank()
        tracks.startGameTrack = 1;
        mario.style.width = "130px"
        mario.style.height = "130px"
        pipe.style.right = "-10vw"
        mario.style.bottom = "0px"
        mario.style.display = "inherit"
        bricks.style.display = "grid"
        bricks.style.right = "-10vw"
        mario.classList.remove("game-over-animation")
        mario.src = "../Imagens/mario.png"
        sec = 0, min = 0, hr = 0, pontos = 0
        tracks.gameTrack = 1
        tracks.jumpTrack = 1
        tracks.brickTrack = Math.floor(Math.random() * 5) + 1
        endGame.style.display = "flex"

      }, 3500);

    }

  }

},10)

function som(){
 
   var audio1 = new Audio();
   audio1.src = "../Audios/Mario Death.mp3";
   audio1.volume = 0.05
   audio1.play();

}

async function setNewRank(){

  await get(rankRef)  
  .then((snapshot) => {

    if(snapshot.exists()){
        rankData = snapshot.val().coins
        console.log(rankData)
    }
  })

  console.log(rankData)

  let initialRankData = rankData
  let jaAdd = false;

  initialRankData.map((position, index) => {

    if(!jaAdd){
      
      let indexOfUser = initialRankData.findIndex(position => position.userUid == useruid)
      // console.log(useruid == position.userUid)
      // console.log(indexOfUser)
      
      if(position.pontos < userData.pontos && indexOfUser != -1){

        if(indexOfUser == 0){

          jaAdd = !jaAdd
          initialRankData.shift()
          rankPosition.innerText = `${indexOfUser+1}°`
          userData.posicaoNoRank = indexOfUser  
          initialRankData.unshift({username: userData.username, userUid: useruid, pontos: userData.pontos})

        }else{

          initialRankData.splice(indexOfUser, 1, {username: userData.username, userUid: useruid, pontos: userData.pontos})
          rankPosition.innerText = `${indexOfUser+1}°`
          userData.posicaoNoRank = indexOfUser
          jaAdd = !jaAdd

        }

      }else if(position.pontos < userData.pontos && indexOfUser == -1){

        jaAdd = !jaAdd
        initialRankData.splice(index, 0, {username: userData.username, userUid: useruid, pontos: userData.pontos})
        userData.posicaoNoRank = index
        console.log(userData.posicaoNoRank)
        rankPosition.innerText = `${userData.posicaoNoRank+1}°`

      }

      // console.log(jaAdd)

    }

  })

  rankData = []
  for(var i = 0; i <= 9; i++){

    rankData.push(initialRankData[i])

  }

  // console.log(rankData)
  rankData.sort((a, b) => b.pontos - a.pontos);
  // console.log(rankData)

  let updates = rankData.reduce((acc, obj, index) => {
    acc[index] = obj;
    return acc;
  }, {});

  let newRankRef = ref(database, `ranks/coins`)
  await update(newRankRef, updates)
  .then(() => {
    console.log("Dados atualizados com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao atualizar os dados:", error);
  });

  let newRef = ref(database, `usuarios/${useruid}/`)
  await update(newRef, userData)
  .then(() => {
    console.log("Dados atualizados com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao atualizar os dados:", error);
  });


}