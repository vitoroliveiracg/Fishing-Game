class Fish {
  constructor () {
    this.htmlElement
    this.name = "Fish Undefined"
    this.weight = 0
    this.size = {
      heightName:undefined,
      widthName:undefined,
      height: undefined,
      width: undefined
    
    }
    this.totalLife = 20
    this.moneyPerWeight = 5
    this.velocity = 0.4
    this.positionTop = this.ramdomHeight()
    this.lastPosition = this.positionTop
    this.positionLeft = -10
    this.horiFlow = undefined  //interval 

    /* For wiggle event */
    this.coutingRefresh = 0
    this.where = 0
    this.valocityGoinUp = getRandomInteger(1,3)/10
    this.valocityGoindown = getRandomInteger(1,3)/10
  }


  setImage (side,imgSrc) {
    let image = document.createElement('img')
    image.setAttribute('src',imgSrc)
    image.style.width = getComputedStyle(document.documentElement).getPropertyValue(this.size.widthName)
    image.style.height = getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName)

    if(this.constructor.name == 'Golden'){
      image.setAttribute('src','../imgs/goldenPeixe01.png')
    }
    

    if(side == -1)
      image.style.transform = 'scaleX(-1)'
    this.htmlElement.appendChild(image)
  }

  setHtmlElement (name) {
    this.htmlElement = document.createElement('div')
    this.htmlElement.classList.add(name)
    this.htmlElement.classList.add('fish')
    this.update()
    //this.htmlElement.style.top = `${this.positionTop}vh`
  }

  ramdomHeight () {
    return Number.parseInt(getRandomInteger(15,85))
  }

  wiggle (side) {
    
    if(this.coutingRefresh == 0){
      this.where = getRandomInteger(10,80)
    }

    this.coutingRefresh++
      
    if(this.positionTop > this.where){
      this.positionTop -= this.valocityGoinUp
    }else if(this.positionTop < this.where){
      this.positionTop += this.valocityGoindown
    }

    var angularCoeficient = this.positionTop - this.lastPosition 
    this.htmlElement.style.transform = `rotate(${angularCoeficient * side * 10}deg)`

    this.lastPosition = this.positionTop

    if(this.coutingRefresh >= 70 || this.positionTop >= this.where && this.positionTop <= (this.where + 1.5)){
      this.coutingRefresh = 0
    }
  }

  get isTouching () {
    const domRect1 = document.querySelector('.fishingHook').getBoundingClientRect();
    const domRect2 = this.htmlElement.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
    /*

    this.size.height = Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh',''))
    this.size.width = Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.widthName).replace('vw',''))

    if(this.positionTop <= (fishingHook.position.top + fishingHook.getCssHookHeight())
    && (this.positionTop + this.size.height) >= fishingHook.position.top
    && this.positionLeft <= (fishingHook.position.left + fishingHook.getCssHookWidth())
    && (this.positionLeft + this.size.width) >= fishingHook.position.left){
      return true
    }else{
      return false
    }*/
  }

  giveMoney (min,max,div) {
    let moneyValue = Number.parseFloat(getRandomInteger(min,max)/div).toFixed(1)
    money.value += Number(moneyValue)
    money.update()

    let moneyHookSpam = new HookTextSpam(moneyValue)
    moneyHookSpam.positionLeft = this.positionLeft + fishingHook.getCssHookWidth()/2
    moneyHookSpam.positionTop = this.positionTop - 5
    moneyHookSpam.summon()
  }

  limitsUpDown () {
    if(this.positionTop <= 0) this.positionTop = 0
    if(this.positionTop >= 80) this.positionTop = 80
  }

  startHorizontalFlowLeft () {
    this.horiFlow = setInterval(() => {
      this.positionLeft += this.velocity
      
      this.wiggle(1)

      this.limitsUpDown()

      if(this.isTouching)
      {//if the fish touch the hook
      
        this.totalLife -= 1
      }
      if(this.totalLife <= 0) {

        this.giveMoney(5,25,10)
        this.removeElement()
        clearInterval(this.horiFlow)

      }
      this.update()
      if(this.positionLeft > 110){
        this.removeElement()
        clearInterval(this.horiFlow)
      }
    }, 25);
  }

  startHorizontalFlowRight () {
    this.positionLeft = 110
    this.horiFlow = setInterval(() => {
      this.positionLeft -= this.velocity
      
      this.wiggle(-1)

      this.limitsUpDown()

      if(this.isTouching)
      {//if the fish touch the hook
      
        this.totalLife -= 1
      }
      if(this.totalLife <= 0) {

        this.giveMoney(5,25,10)
        this.removeElement()
        clearInterval(this.horiFlow)

      }
      this.update()
      if(this.positionLeft < -10){
        this.removeElement()
        clearInterval(this.horiFlow)
      }
    }, 25);
  }
  
  spawnFish () {
    fishesConfig.amount++
    document.querySelector('.fishingArea').appendChild(this.htmlElement)
    if(getRandomInteger(1,100) < 50){
      this.startHorizontalFlowLeft()
      this.setImage(-1,'../imgs/tilapiaPeixe01.png')
    }else {
      this.setImage(0,'../imgs/tilapiaPeixe01.png')
      this.startHorizontalFlowRight()
    }
    
  }

  update () {
    this.htmlElement.style.top = `${this.positionTop}vh`
    this.htmlElement.style.left = `${Number(this.positionLeft)}vw`
  }

  removeElement (){
    fishesConfig.amount--
    document.querySelector('.fishingArea').removeChild(this.htmlElement)
  }
}



/* Types of fishes! */

/* ----------------------------------------------------------------------------------------------- */
class Tilapia extends Fish {
  constructor () {
    super()
    this.velocity = getRandomInteger(30,38)/100
    this.name = "tilapia"
    this.size = {
      heightName:"--fish-salmon-height",
      widthName:"--fish-salmon-width",
      //height: Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh','')),
      //width: Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.widthName).replace('vw',''))
    }

    super.setHtmlElement(this.name)
    super.update()
  }


}



class Golden extends Fish {
  constructor () {
    super()

    this.velocity = getRandomInteger(30,38)/40
    this.name = "golden"
    this.size = {
      heightName:"--fish-golden-height",
      widthName:"--fish-golden-width",  
    }

    this.totalLife = 3

    this.verticalRandom = getRandomInteger(2,7)
    this.largerArch = getRandomInteger(7,20)
    this.randomArch = getRandomInteger(1,180)
    this.lastPosition = (Math.sin(this.positionLeft / this.largerArch) + this.where) * 10

    this.particlesOcurrence = undefined

    super.setHtmlElement(this.name)
    super.update()
  }

  wiggle (side) {
    this.positionTop = (Math.sin(this.positionLeft / this.largerArch + this.randomArch) + this.verticalRandom) * 10
    var angularCoeficient = this.positionTop - this.lastPosition 
    this.htmlElement.style.transform = `rotate(${angularCoeficient * side * 10}deg)`
    this.lastPosition = this.positionTop
  }

  setParticles (positionTop, positionLeft, x, y, z, w) {
    
    let sparkle = new StarParticle(x,y,z,w)
    sparkle.typeOfLeft = "vw"
    sparkle.typeOfTop = "vh"
    sparkle.position.top = positionTop
    sparkle.position.left = positionLeft
    sparkle.spawnParticle()
  }
  
  startHorizontalFlowLeft () {
    this.particlesOcurrence = setInterval(() => {
      this.setParticles(this.positionTop + Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh',''))/2,
      this.positionLeft + 1,10,1,10,10)
    }, 210 + (particlesConfig.amount * 30));
    
    this.horiFlow = setInterval(() => {
      this.positionLeft += this.velocity
      // this.setParticles()

      this.wiggle(1)

      this.limitsUpDown()

      if(this.isTouching)
      {//if the fish touch the hook
      
        this.totalLife -= 1
      }
      if(this.totalLife <= 0) {

        this.giveMoney(50,250,4)
        this.removeElement()

        /* Spawning particles when catched */
        for (let i = 0; i < 6; i++) {
          this.setParticles(this.positionTop + 
            Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh',''))/2,
            this.positionLeft + 
            Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.widthName).replace('vw','')) - 1 
            ,6,19,10,10)
        }

        clearInterval(this.horiFlow)
        clearInterval(this.particlesOcurrence)

      }
      this.update()
      if(this.positionLeft > 105){
        this.removeElement()
        clearInterval(this.horiFlow)
        clearInterval(this.particlesOcurrence)
      }
    }, 25);
  }

  
  startHorizontalFlowRight () {
    this.positionLeft = 110

    this.particlesOcurrence = setInterval(() => {
      this.setParticles(this.positionTop + Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh',''))/2,
      this.positionLeft + 7,10,1,10,10)
    }, 210 + (particlesConfig.amount * 30));
    
    this.horiFlow = setInterval(() => {
      this.positionLeft -= this.velocity
      // this.setParticles()

      this.wiggle(-1)

      this.limitsUpDown()

      if(this.isTouching)
      {//if the fish touch the hook
      
        this.totalLife -= 1
      }
      if(this.totalLife <= 0) {

        this.giveMoney(50,250,4)
        this.removeElement()

        /* Spawning particles when catched */
        for (let i = 0; i < 6; i++) {
          this.setParticles(this.positionTop + 
            Number(getComputedStyle(document.documentElement).getPropertyValue(this.size.heightName).replace('vh',''))/2,
            this.positionLeft + 2 
            ,19,6,10,10)
        }

        clearInterval(this.horiFlow)
        clearInterval(this.particlesOcurrence)

      }
      this.update()
      if(this.positionLeft < -10){
        this.removeElement()
        clearInterval(this.horiFlow)
        clearInterval(this.particlesOcurrence)
      }
    }, 25);
  }


}





/* Particles! YEY */

/* ----------------------------------------------------------------------------------------------- */
class Particle {
  constructor (_whereToSpawn = "body") {
    this.img = document.createElement('IMG')
    
    this.typeOfLeft = "px"
    this.typeOfTop = "px"
    
    this.position = {
      left:0,
      top:0
    }

    this.translate = {
      left:0,
      top:0
    }
    this.height = 0
    this.killing = undefined

    this.whereToSpawn = _whereToSpawn

    this.setHeight()
    
  }

  setHeight () {
    this.height = getRandomInteger(44,84)
    this.translate.left = -this.height/2
    this.translate.top = -this.height/2
  }

  spawnParticle () {
    if(particlesConfig.amount <= 25){ //limite de 25 particulas na tela
      
      this.position.left = this.position.left
      this.position.top = this.position.top
      particlesConfig.amount++
      this.update()
      document.querySelector(`${this.whereToSpawn}`).appendChild(this.img)
      setTimeout(() => {
        this.killParticle()
      }, 1000);
    }
  }

  removeFromScreen () {
    document.querySelector(`${this.whereToSpawn}`).removeChild(this.img)
  }

  killParticle () {
    particlesConfig.amount--
    this.killing = setInterval(() => {
      if(this.height >= 1){
        this.height -= 2
        this.translate.left += 1
        this.translate.top += 1
        this.update()
      }else{
        this.removeFromScreen()
        clearInterval(this.killing)
      }
    }, 20);
  }

  update () {
    this.img.style.transform = `translate(${this.translate.left}px,${this.translate.top}px)`
    this.img.style.height = `${this.height}px`
    this.img.style.opacity = `${this.opacity}`
    this.img.style.left = `${this.position.left}${this.typeOfLeft}`
    this.img.style.top = `${this.position.top}${this.typeOfTop}`
  }

  setImage (src) {
    this.img.classList.add('particle')
    this.img.setAttribute('src',src)
  }
}


/* ----------------------------------------------------------------------------------------------- */
class StarParticle extends Particle {
  constructor (_minLeft = 35, _maxLeft = 35, _minTop = 35, _maxTop = 35) {
    super(".fishingArea")

    
    this.velocity = {
      left:0,
      top:0,
      minLeft:_minLeft,
      minTop:_minTop,
      maxLeft:_maxLeft,
      maxTop:_maxTop
    }
    this.moviment = undefined

    this.setImage(this.getStarGif)
    this.doMove()
  }

  /* Put here others star gifs */
  get getStarGif () {
    let image
    let number = getRandomInteger(0,100)
    if(number <= 30){
      image = "./imgs/star02.gif"
    }else if (number <=65) {
      image = "./imgs/star01.gif"
    }else {
      image = "./imgs/star03.gif"
    }
    return image
  } 

  doMove () {    
    this.velocity.left = getRandomInteger(0,this.velocity.maxLeft)/10 - getRandomInteger(0,this.velocity.minLeft)/10
    this.velocity.top = getRandomInteger(0,this.velocity.maxTop)/10 - getRandomInteger(0,this.velocity.minTop)/10

    this.moviment = setInterval(() => {

      this.position.left += this.velocity.left
      this.position.top += this.velocity.top
      this.update()

    }, 100);
    
  }

}

class HookTextSpam {
  constructor (_text) {
    this.htmlElement = document.createElement('div')

    this.text = _text
    this.opacity = 1
    this.visualInterval = undefined
    this.positionTop
    this.positionLeft
  }

  summon () {
    this.htmlElement.classList.add('moneyEarnSpam')
    this.htmlElement.innerText = `+ ${this.text}`

    
    document.querySelector('.fishingArea').appendChild(this.htmlElement)

    this.visualInterval = setInterval(() => {
      this.opacity -= 0.02
      this.positionTop -= 0.35
      this.update()
    }, 25);

    setTimeout(() => {
      this.kill()
    }, 1500);
  }

  update () {
    this.htmlElement.style.opacity = this.opacity
    this.htmlElement.style.left = `${this.positionLeft}vw`
    this.htmlElement.style.top = `${this.positionTop}vh`
  }

  kill () {
    clearInterval(this.visualInterval)
    document.querySelector('.fishingArea').removeChild(this.htmlElement)
  }


}