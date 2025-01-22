// priority: 40

// This file is only for alcohol-related items.

global.alcohol = [
  {'name': 'vodka', 'title': 'Vodka', 'color': 0xFFFFFF, 'ingredient1': 'minecraft:potato', 'fluid': 'minecraft:water'},
  {'name': 'gin', 'title': 'Gin', 'color': 0xFFFFFF, 'ingredient1': 'minecraft:sweet_berries', 'fluid': 'minecraft:water'},
  {'name': 'whisky', 'title': 'Whisky', 'color': 0x6f3312, 'ingredient1': 'culturaldelights:corn_cob', 'fluid': 'minecraft:water'},
  {'name': 'rum', 'title': 'Rum', 'color': 0x764023, 'ingredient1': 'minecraft:sugar_cane', 'fluid': 'minecraft:water'},
  {'name': 'tequila', 'title': 'Tequila', 'color': 0xD19619, 'ingredient1': 'minecraft:cactus', 'fluid': 'minecraft:water'},
  {'name': 'beer', 'title': 'Beer', 'color': 0xd8ab15, 'ingredient1': 'minecraft:wheat', 'fluid': 'minecraft:water'},
  {'name': 'sake', 'title': 'Sake', 'color': 0xFFFFFF, 'ingredient1': 'farmersdelight:rice', 'fluid': 'minecraft:water'},
  {'name': 'tonic', 'title': 'Tonic', 'color': 0xFFFFFF, 'ingredient1': 'farmersdelight:tree_bark', 'fluid': 'minecraft:water'},
  {'name': 'brandy', 'title': 'Brandy', 'color': 0xD19619, 'fluid': 'farmersrespite:apple_cider'},
  {'name': 'mead', 'title': 'Mead', 'color': 0xD6A225, 'fluid': 'create:honey'},
  {'name': 'bitters', 'title': 'Bitters', 'color': 0xCCCCCC, 'fluid': 'kubejs:vodka', 'ingredient1': 'neapolitan:dried_vanilla_pods'},
  {'name': 'orange_liqueur', 'title': 'Orange Liqueur', 'color': 0xFFCC00, 'fluid': 'kubejs:vodka', 'ingredient1': 'kubejs:orange_slice'},
  {'name': 'wine', 'title': 'Wine', 'color': 0xCC0099, 'fluid': 'kubejs:grape_juice'},
]

global.mixedDrinks = [
  {'name': 'vodka_tonic', 'title': 'Vodka Tonic', 'color': 0xFFFFFF, 'ingredients': [{'fluid': 'kubejs:vodka', 'amount': 50}, {'fluid': 'kubejs:tonic', 'amount': 200}]},
  {'name': 'gin_tonic', 'title': 'Gin and Tonic', 'color': 0xFFFFFF, 'ingredients': [{'fluid': 'kubejs:gin', 'amount': 50}, {'fluid': 'kubejs:tonic', 'amount': 200}]},
  {'name': 'margarita', 'title': 'Margarita', 'color': 0xCCFF99, 'ingredients': [{'fluid': 'kubejs:tequila', 'amount': 50}, {'fluid': 'kubejs:orange_liqueur', 'amount': 25}, {'fluid': 'kubejs:lime_juice', 'amount': 175}]},
  {'name': 'michelada', 'title': 'Michelada', 'color': 0xFF0000, 'ingredients': [{'fluid': 'kubejs:beer', 'amount': 150}, {'fluid': 'kubejs:tomato_juice', 'amount': 90}, {'fluid': 'kubejs:chile_paste', 'amount': 10}]},
  {'name': 'long_island_iced_tea', 'title': 'Long Island Iced Tea', 'color': 0x764023, 'ingredients': [{'fluid': 'kubejs:vodka', 'amount': 50}, {'fluid': 'kubejs:gin', 'amount': 50}, {'fluid': 'kubejs:rum', 'amount': 50}, {'fluid': 'kubejs:tequila', 'amount': 50}, {'fluid': 'farmersrespite:black_tea', 'amount': 50}], 'tooltip': 'Regret in a glass.'},
  {'name': 'irish_coffee', 'title': 'Irish Coffee', 'color': 0x764023, 'ingredients': [{'fluid': 'farmersrespite:coffee', 'amount': 200}, {'fluid': 'kubejs:whisky', 'amount': 50}]},
  {'name': 'rum_punch', 'title': 'Rum Punch', 'color': 0xffcc00, 'ingredients': [{'fluid': 'kubejs:rum', 'amount': 50}, {'fluid': 'farmersrespite:melon_juice', 'amount': 75}, {'fluid': 'kubejs:pomegranate_juice', 'amount': 75}, {'fluid': 'kubejs:lime_juice', 'amount': 50}]},
  {'name': 'old_fashioned', 'title': 'Old Fashioned', 'color': 0x764023, 'ingredients': [{'fluid': 'kubejs:whisky', 'amount': 200}, {'fluid': 'minecraft:water', 'amount': 45}, {'item': 'minecraft:sugar'}, {'fluid': 'kubejs:bitters', 'amount': 5}]},
  {'name': 'screwdriver', 'title': 'Screwdriver', 'color': 0xffcc00, 'ingredients': [{'fluid': 'kubejs:vodka', 'amount': 50}, {'fluid': 'kubejs:orange_juice', 'amount': 200}]},
  {'name': 'gin_juice', 'title': 'Gin and Juice', 'color': 0xffcc00, 'ingredients': [{'fluid': 'kubejs:gin', 'amount': 50}, {'fluid': 'kubejs:orange_juice', 'amount': 200}]},
  {'name': 'vermouth', 'title': 'Vermouth', 'color': 0xCC0099, 'ingredients': [{'fluid': 'kubejs:wine', 'amount': 150}, {'fluid': 'kubejs:vodka', 'amount': 100}, {'item': 'neapolitan:dried_vanilla_pods'}, {'item': 'farmersdelight:tree_bark'}]},
  {'name': 'vodka_martini', 'title': 'Vodka Martini', 'color': 0xFFFFFF, 'ingredients': [{'fluid': 'kubejs:vodka', 'amount': 200}, {'fluid': 'kubejs:vermouth', 'amount': 50}], 'tooltip': 'Shaken, not stirred.'},
  {'name': 'gin_martini', 'title': 'Gin Martini', 'color': 0xFFFFFF, 'ingredients': [{'fluid': 'kubejs:gin', 'amount': 200}, {'fluid': 'kubejs:vermouth', 'amount': 50}]},
  {'name': 'manhattan', 'title': 'Manhattan', 'color': 0xCC9900, 'ingredients': [{'fluid': 'kubejs:whisky', 'amount': 170}, {'fluid': 'kubejs:vermouth', 'amount': 75}, {'fluid': 'kubejs:bitters', 'amount': 5}]},
  {'name': 'vieux_carre', 'title': 'Vieux Carre', 'color': 0xCC9900, 'ingredients': [{'fluid': 'kubejs:brandy', 'amount': 80}, {'fluid': 'kubejs:whisky', 'amount': 80}, {'fluid': 'kubejs:vermouth', 'amount': 80}, {'fluid': 'kubejs:bitters', 'amount': 10}]},
]

StartupEvents.registry('item', event => {
  // Alcohol
  for(let i = 0; i < global.alcohol.length; i++) {
    let drink = global.alcohol[i];
    let tooltip = drink.tooltip || 'A tasty adult beverage.'

    event.create(drink.name + '_bottle')
      .displayName('Bottle of ' + drink.title)
      .tooltip(tooltip)
      .food(food => {
        food
          .effect('nausea', 200, 0, 0.2)
          .effect('slowness', 500, 0, 0.3)
          .hunger(1)
          .saturation(2)
          .alwaysEdible()
          .eaten(ctx => {
            ctx.player.give(Item.of('minecraft:glass_bottle', 1))
          })
      })
  }

  for(let i = 0; i < global.mixedDrinks.length; i++) {
    let drink = global.mixedDrinks[i]
    let tooltip = drink.tooltip || 'A tasty adult beverage.'

    event.create(drink.name + '_bottle')
      .displayName(drink.title)
      .tooltip(tooltip)
      .food(food => {
        food
          .effect('nausea', 200, 0, 0.2)
          .effect('slowness', 500, 0, 0.3)
          .hunger(1)
          .saturation(2)
          .alwaysEdible()
          .eaten(ctx => {
            ctx.player.give(Item.of('minecraft:glass_bottle', 1))
          })
      })


      // If we switch to sequenced assembly...
      // createIncompleteItem(event, drink.name, 'kubejs:item/empty_glass')
  }
})

StartupEvents.registry('fluid', event => {
  for(let i = 0; i < global.alcohol.length; i++) {
    let drink = global.alcohol[i];

    event.create(drink.name)
      .thinTexture(drink.color)
      .bucketColor(drink.color)
      .displayName(drink.title)
  }

  for(let i = 0; i < global.mixedDrinks.length; i++) {
    let drink = global.mixedDrinks[i]

    event.create(drink.name)
      .thinTexture(drink.color)
      .bucketColor(drink.color)
      .displayName(drink.title)
  }

})