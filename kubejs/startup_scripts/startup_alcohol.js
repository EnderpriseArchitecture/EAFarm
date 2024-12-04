// priority: 40

// This file is only for alcohol-related items.

global.alcohol = [
  { 'name': 'vodka', 'title': 'Vodka', 'color': 0xFFFFFF, 'ingredient1': 'minecraft:potato', 'fluid': 'minecraft:water' },
  { 'name': 'gin', 'title': 'Gin', 'color': 0xFFFFFF, 'ingredient1': 'minecraft:sweet_berries', 'fluid': 'minecraft:water' },
  { 'name': 'whisky', 'title': 'Whisky', 'color': 0x6f3312, 'ingredient1': 'culturaldelights:corn_cob', 'fluid': 'minecraft:water' },
  { 'name': 'rum', 'title': 'Rum', 'color': 0x764023, 'ingredient1': 'minecraft:sugar_cane', 'fluid': 'minecraft:water' },
  { 'name': 'tequila', 'title': 'Tequila', 'color': 0xD19619, 'ingredient1': 'minecraft:cactus', 'fluid': 'minecraft:water' },
  { 'name': 'beer', 'title': 'Beer', 'color': 0xd8ab15, 'ingredient1': 'minecraft:wheat', 'fluid': 'minecraft:water' },
  { 'name': 'sake', 'title': 'Sake', 'color': 0xFFFFFF, 'ingredient1': 'farmersdelight:rice', 'fluid': 'minecraft:water' },
  { 'name': 'tonic', 'title': 'Tonic', 'color': 0xFFFFFF, 'ingredient1': 'farmersdelight:tree_bark', 'fluid': 'minecraft:water' },
  { 'name': 'brandy', 'title': 'Brandy', 'color': 0xD19619, 'fluid': 'farmersrespite:apple_cider' },
  { 'name': 'mead', 'title': 'Mead', 'color': 0xD6A225, 'fluid': 'create:honey' }
]

StartupEvents.registry('item', event => {
  // Alcohol
  for(let i = 0; i < global.alcohol.length; i++) {
    let drink = global.alcohol[i];

    event.create(drink.name + '_bottle')
      .displayName('Bottle of ' + drink.title)
      .tooltip("A tasty adult beverage.")
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
})

StartupEvents.registry('fluid', event => {
  // Alcohol
  for(let i = 0; i < global.alcohol.length; i++) {
    let drink = global.alcohol[i];

    event.create(drink.name)
      .thinTexture(drink.color)
      .bucketColor(drink.color)
      .displayName(drink.title)
  }

})