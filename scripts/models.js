// MODELS

let fishingHook = {
  htmlObj: document.querySelector('.fishingHook'),
  cssHookHeight:getComputedStyle(document.documentElement).getPropertyValue('--fishing-hook-height'),
  cssHookWidth:getComputedStyle(document.documentElement).getPropertyValue('--fishing-hook-width'),
  getCssHookHeight:function () {
    return Number(getComputedStyle(document.documentElement).getPropertyValue('--fishing-hook-height').replace('vh',''))
  },
  getCssHookWidth:function () {
    return Number(getComputedStyle(document.documentElement).getPropertyValue('--fishing-hook-width').replace('vw',''))
  },
  position:{
    left:46,
    top:0
  },
  fishingHookJump:function(){
    fishingHook.gravity.velocidy = -fishingHook.jumpingPower
  },
  atualiza: function (){
    fishingHook.htmlObj.style.top = `${Number(fishingHook.position.top)}vh` 
  },
  jumping:{
    initialValue:1
  },
  jumpingPower: 0.5,
  gravity:{
    func:undefined,
    velocidy:0.5,
    aceleration:{
      interval:undefined,
      activated:false,
      func:undefined,
      value:0.4
    }
  }
}


let money = {
  htmlElemnt: document.querySelector('.hookUpgrades .title .money'),
  value: 0,
  multiply:1,
  getMoney:function () {
    return parseFloat(money.value * money.multiply).toFixed(1)
  },
  update:function () {
    console.log(money.getMoney())
    money.htmlElemnt.innerText = `${money.getMoney()}`
  }
}


let hookUpgrade = {
  isTabOn: false,
  section: document.querySelector('.hookUpgrades'),
  upgrades: document.querySelector('.hookUpgradesArea .upgrades'),
  tinyIcon: document.querySelector('.tinyHookUpgradesTabIcon'),
  hookUpgradesTab: function () {
    hookUpgrade.isTabOn == false ? hookUpgrade.openHookUpgradeTab() : hookUpgrade.closeHookUpgradeTab()
  },
  openHookUpgradeTab: function () {
    hookUpgrade.isTabOn = true
    hookUpgrade.tinyIcon.style.marginLeft = '70vw'
    hookUpgrade.section.style.left = '0'
  },
  closeHookUpgradeTab: function () {
    hookUpgrade.isTabOn = false
    hookUpgrade.tinyIcon.style.marginLeft = '0'
    hookUpgrade.section.style.left = '-70vw'
  }
}

let particlesConfig = {
  amount:0
}

let fishesConfig = {
  amount:0
}