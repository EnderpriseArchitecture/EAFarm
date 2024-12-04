// priority: 80

// This file is for crop-related interactions and recipes.

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

LootJS.modifiers((event) => {
  // event.enableLogging();
  for(let i = 0; i < global.custom_crops.length; i++) {
    let crop = global.custom_crops[i]

    event
      .addBlockLootModifier('kubejs:' + crop[0])
      .matchLoot('kubejs:' + crop[0])
      .modifyLoot(Item.of('kubejs:' + crop[0]), itemStack => {
        let randomInt = random(crop[2][0], crop[2][1])

        itemStack.setCount(randomInt)
        return itemStack
      })

    // The wild version of our crop should never drop itself.
    // Instead, give seeds and a fruit
    let wild = event
      .addBlockLootModifier('kubejs:wild_' + crop[0])
      .matchLoot('kubejs:wild_' + crop[0])
      .modifyLoot(Item.of('kubejs:wild_' + crop[0]), itemStack => {
        let randomInt = random(crop[2][0], crop[2][1])

        return Item.of('kubejs:'+crop[0], randomInt)

        // return itemStack
      })

    // If it has a seed, add that to our loot.
    if(crop[3]) {
      wild.addLoot('kubejs:' + crop[0] + '_seed')
    }

  }

})

ServerEvents.recipes(event => {
  // If it's a crop with seeds, then get seeds from the crop
  for(let i = 0; i < global.custom_crops.length; i++) {
    let crop = global.custom_crops[i]
    if(crop[3]) {
      event.shapeless('3x kubejs:' + crop[0] + '_seed', 'kubejs:' + crop[0])
    }
  }

  // Add new custom recipes.
  event.smelting('kubejs:roasted_chiles', 'kubejs:chile_pepper')

  event.recipes.create.milling('kubejs:chile_powder', 'kubejs:roasted_chiles');
  event.recipes.create.compacting({'fluid': 'kubejs:chile_paste', 'amount': 250}, ['kubejs:chile_pepper'])

  event.recipes.create.mixing('kubejs:salsa', ['kubejs:chile_powder', 'kubejs:cut_chile_pepper', 'kubejs:cut_green_pepper', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion'])

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('farmersdelight:cabbage_leaf'))
    .requireFluid(Fluid.of('kubejs:chile_paste', 1000))
    .produceItem(Item.of('kubejs:kimchi_cabbage'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('culturaldelights:cut_cucumber'))
    .requireFluid(Fluid.of('kubejs:chile_paste', 1000))
    .produceItem(Item.of('kubejs:kimchi_cucumber'))

  event.recipes.create.filling('kubejs:chile_paste_bottle', [Fluid.of('kubejs:chile_paste', 250), 'minecraft:glass_bottle'])


})