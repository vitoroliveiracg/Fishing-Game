//----------------------------------------------------
let mousePos = {x:undefined, y:undefined}
window.addEventListener('mousemove',(e)=>{
  mousePos.x = e.clientX
  mousePos.y = e.clientY
})
//----------------------------------------------------

let fishUpgrade = {
  tabOn: false,
  // htmlElementClickable: document.querySelector('')
}


let tinyLeftUpgradesIcons = document.querySelectorAll('.leftButtons .tinyUpgradeLeftTabIcon')

tinyLeftUpgradesIcons.forEach(elem=>{
  elem.addEventListener('mouseover',()=>{
    elem.style.paddingLeft = '2.8vw'
  })
  elem.addEventListener('mouseout',()=>{
    elem.style.paddingLeft = '1.3vw'
  })

  elem.addEventListener('click',()=>{

    if(elem.classList.contains('tinyHookUpgradesTabIcon')){
      hookUpgrade.hookUpgradesTab()
    }else if(elem.classList.contains('tinyFishUpgradeTabIcon')){}
  
  })
})


//let newElement = document.createElement('div')
//newElement.classList.add('fishUpgrade')


// criar uma classe para as descricoes
document.querySelectorAll('.hookUpgrade span').forEach(el => {      
  let description = window.document.createElement('div')
  
  description.classList.add('descricao')
  el.addEventListener('mouseenter',()=>{
    let elemBounding = el.getBoundingClientRect()
    description.style.left = `${elemBounding.left/2 + 20}px`
    description.style.top = `${elemBounding.top + 20}px`
    console.log(elemBounding.left)
    switch (el.innerText.toUpperCase()) {
      case "FREQUENCIA":
        description.innerHTML = 'vezes que o peixe aparece por minuto'
        break;
      case "VALIOSOS":
        description.innerHTML = 'está relacionado com o valor de venda'
        break;
    
      default:
        break;
    }
    document.querySelector('body').appendChild(description)
  })

  el.addEventListener('mouseout',()=>{
    document.querySelector('body').removeChild(description)
  })
  
  el.addEventListener('mousemove',()=>{
    /*
    document.querySelector('.descricao').style.left = `${mousePos.x - 110}px`
    document.querySelector('.descricao').style.top = `${mousePos.y + 15}px`
    */
  })
  
});


let botoesMoveTela = document.querySelectorAll('.screenButtons')
botoesMoveTela.forEach(e=>{
  e.addEventListener('mouseover',()=>{
    e.style.opacity = 1
  })
  e.addEventListener('mouseout',()=>{
    e.style.opacity = 0.1
  })
  e.addEventListener('click',()=>{
    if(e.classList.contains('upwardsButton')){
      screenGoUpward()
    }else if(e.classList.contains('downwardsButton')){
      screenGoDownwards()
    }
  })
})

function screenGoUpward () {
  document.querySelector('.underWaterFishing').style.top = '100vh'
  document.querySelector('.overWaterBoat').style.top = '0'
}

function screenGoDownwards () {
  document.querySelector('.underWaterFishing').style.top = '0'
  document.querySelector('.overWaterBoat').style.top = '-100vh'
}

let countDown
document.querySelector('.buttonSpawnFish').addEventListener('click', ()=>{
  /* A cada 1s tem X% de chance de spawnar 1 peixe*/
  
  countDown = setInterval(() => {
    if(fishesConfig.amount <= 60) { //limite de 30 peixes na tela
      if(getRandomInteger(0,1000) <= 27){
        let tilapia = new Tilapia()
        tilapia.spawnFish()
      }
  
      if(getRandomInteger(0,1000) <= 1) {
        let golden = new Golden()
        golden.spawnFish()
      }
    }
    
  }, 100);
  
  
})

let repete 
function activation () {
  clearInterval(repete)
  fishingHook.cssHookHeight = getComputedStyle(document.documentElement).getPropertyValue('--fishing-hook-height')
  
  fishingHook.cssHookHeight = fishingHook.cssHookHeight.replace('vh','')
  fishingHook.cssHookHeight = 8.5
  
  repete = setInterval(() => {
    document.documentElement.style.setProperty('--fishing-hook-height', `${fishingHook.cssHookHeight}vh`)
    if(fishingHook.cssHookHeight >= 6.8){
      fishingHook.cssHookHeight -= 0.03
    }else{
      clearInterval(repete)
    }
  }, 1);
  
  document.documentElement.style.setProperty('--variavel', `${fishingHook.cssHookHeight}vh`)
  
}
