// priority: 40

JEIEvents.hideItems(event => {
  if(!global.showDrinks) {
    for(let i = 0; i < global.alcohol.length; i++) {
      let drink = global.alcohol[i]

      event.hide('kubejs:' + drink.name + '_bottle')
      event.hide('kubejs:' + drink.name + '_bucket')
    }

    for(let i = 0; i < global.mixedDrinks.length; i++) {
      let drink = global.mixedDrinks[i]

      event.hide('kubejs:' + drink.name + '_bottle')
      event.hide('kubejs:' + drink.name + '_bucket')
    }
  }
})

JEIEvents.hideFluids(event => {
  console.log('JEIEvents.hideFluids', global.showDrinks, event);

  if(!global.showDrinks) {
    for(let i = 0; i < global.alcohol.length; i++) {
      let drink = global.alcohol[i]
      event.hide('kubejs:' + drink.name)
    }

    for(let i = 0; i < global.mixedDrinks.length; i++) {
      let drink = global.mixedDrinks[i]
      event.hide('kubejs:' + drink.name)
    }
  }
})

