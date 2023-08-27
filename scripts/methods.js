//import name from "./name.js";

// FUNCTIONS
let fishingArea = document.querySelector('.fishingArea')

document.querySelectorAll('.hookUpgrade').forEach(elem=>{
  let backgroudImage = elem.querySelector('.backgroundImage')
  elem.addEventListener('mouseover',()=>{
    backgroudImage.setAttribute('src','./imgs/upgradeBackground02.png')
  })
  elem.addEventListener('mouseout',()=>{
    backgroudImage.setAttribute('src','./imgs/upgradeBackground0202.png')
  })
})

document.onload = iniciacao()
function iniciacao() {
  //fish.inicializar("salmao", 3, -145, 50)
  //fish.spawnFish()
  aceleracao()

  fishingHook.gravity.func = setInterval(function(){
    fishingHook.position.top += fishingHook.gravity.velocidy

    if(fishingHook.position.top >= 87){

      fishingHook.position.top = 87
      fishingHook.gravity.velocidy < 0.6? fishingHook.gravity.velocidy = 0: fishingHook.gravity.velocidy = -(fishingHook.gravity.velocidy * 0.5)
        
    }
    if(fishingHook.position.top < 0){
      
      fishingHook.position.top = 1
      fishingHook.gravity.velocidy = 0.1
      // fishingHook.gravity.aceleration.value = 0.2
    }
      //console.log("velocity: "+fishingHook.gravity.velocidy)
    fishingHook.atualiza()
  }, 25);  
}

function aceleracao(){
  fishingHook.gravity.aceleration.interval = setInterval(function(){
    if(fishingHook.gravity.velocidy < 3.0){
      fishingHook.gravity.velocidy += fishingHook.gravity.aceleration.value
    }
    
  }, 200);
}

function closeAllTabs () {
  hookUpgrade.closeHookUpgradeTab()
}

fishingArea.addEventListener('click',()=>{
  closeAllTabs()
})


document.addEventListener('keydown',event => {
  switch (event.key) {
    
    case " ":
        fishingHook.fishingHookJump()
        activation()
      break;
    
      case "Control":
        //hookUpgrade.hookUpgradesTab()
      break

    case "ArrowUp":
      screenGoUpward()
      break

    case "ArrowDown":
      screenGoDownwards()
      break
    default:
      break;
  }
})


function getRandomInteger(min=0, max=0) {
  return Math.floor(Math.random() * (max - min)) + min
}
