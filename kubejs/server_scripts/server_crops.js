// priority: 80

// This file is for crop-related interactions and recipes.

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

LootJS.modifiers((event) => {
  // event.enableLogging();
  for(let i = 0; i < global.custom_crops.length; i++) {
    let crop = global.custom_crops[i]

    let cropName = crop[0]
    let amount = crop[2]
    let hasSeed = crop[3]
    if(!hasSeed) {
      cropName += '_seed'
    }

    event
      .addBlockLootModifier('kubejs:' + crop[0])
      .matchLoot('kubejs:' + cropName)
      .modifyLoot(Item.of('kubejs:' + cropName), itemStack => {
        let randomInt = random(amount[0], amount[1])

        itemStack.setCount(randomInt)
        return itemStack
      })

    // The wild version of our crop should never drop itself.
    // Instead, give seeds and a fruit
    let wild = event
      .addBlockLootModifier('kubejs:wild_' + crop[0])
      .matchLoot('kubejs:wild_' + crop[0])
      .modifyLoot(Item.of('kubejs:wild_' + crop[0]), itemStack => {
        let randomInt = random(amount[0], amount[1])

        return Item.of('kubejs:' + cropName, randomInt)

        // return itemStack
      })

    // If it has a seed, add that to our loot.
    if(crop[3]) {
      wild.addLoot('kubejs:' + crop[0] + '_seed')
    }

  }

  event
    .addBlockLootModifier('kubejs:coffee')
    .matchLoot('kubejs:coffee_seed')
    .removeLoot('kubejs:coffee_seed')
    .addLoot('5x farmersrespite:coffee_berries')

  event
    .addBlockLootModifier('kubejs:lime')
    .matchLoot('kubejs:lime_seed')
    .removeLoot('kubejs:lime_seed')
    .addLoot('4x collectorsreap:lime')

  event
    .addBlockLootModifier('kubejs:pomegranate')
    .matchLoot('kubejs:pomegranate_seed')
    .removeLoot('kubejs:pomegranate_seed')
    .addLoot('4x collectorsreap:pomegranate')

  event
    .addBlockLootModifier('kubejs:avocado')
    .matchLoot('kubejs:avocado_seed')
    .removeLoot('kubejs:avocado_seed')
    .addLoot('4x culturaldelights:avocado')

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
  event.smelting('kubejs:black_bean_patty', 'kubejs:uncooked_black_bean_patty');

  event.recipes.create.compacting('kubejs:uncooked_black_bean_patty', ['kubejs:black_beans_seed']),
  event.custom({
    'type': 'farmersdelight:cutting',
    'ingredients': [
      {
        'item': 'kubejs:black_beans_seed'
      }
    ],
    'result': [
      {
        'item': 'kubejs:uncooked_black_bean_patty'
      }
    ],
    'tool': {
      'tag': 'forge:tools/knives'
    }
  })

  event.recipes.create.milling('kubejs:chile_powder', 'kubejs:roasted_chiles');
  event.recipes.create.compacting({'fluid': 'kubejs:chile_paste', 'amount': 250}, ['kubejs:chile_pepper'])

  event.custom({
    'type': 'createaddition:liquid_burning',
    'input': {
          'fluid': 'kubejs:chile_paste',
          'amount': 1000
    },
    'burnTime': 20000,
    // 'superheated': true
  })

  event.recipes.create.mixing('kubejs:salsa', ['kubejs:chile_powder', 'kubejs:cut_chile_pepper', 'kubejs:cut_green_pepper', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion'])

  event.shapeless('kubejs:chips_and_salsa', ['culturaldelights:tortilla_chips', 'kubejs:salsa'])

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('farmersdelight:cabbage_leaf'))
    .requireFluid(Fluid.of('kubejs:chile_paste', 1000))
    .produceItem(Item.of('kubejs:kimchi_cabbage'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('culturaldelights:cut_cucumber'))
    .requireFluid(Fluid.of('kubejs:chile_paste', 1000))
    .produceItem(Item.of('kubejs:kimchi_cucumber'))

  event.recipes.create.filling('kubejs:chile_paste_bottle', [Fluid.of('kubejs:chile_paste', 250), 'minecraft:glass_bottle'])
  event.recipes.create.emptying([Fluid.of('kubejs:chile_paste', 250), 'minecraft:glass_bottle'], 'kubejs:chile_paste_bottle')

  // Oranges
  event.custom({
    'type': 'farmersdelight:cutting',
    'ingredients': [Item.of('kubejs:orange')],
    'result': [
      Item.of('kubejs:orange_slice', 8),
      Item.of('kubejs:orange_seed', 4)
    ],
    'tool': {
      'tag': 'forge:tools/knives'
    }
  })

   // Add gummy recipes
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'minecraft:slime_ball'},
      {'item': 'minecraft:sugar'},
      {'item': 'kubejs:orange_slice'}
    ],
    'result': {item: 'collectorsreap:orange_gummy'}
  })

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'minecraft:slime_ball'},
      {'item': 'minecraft:sugar'},
      {'item': 'kubejs:grape'}
    ],
    'result': {item: 'kubejs:grape_gummy'}
  })

  // Jaffa cakes
  event.recipes.create.mixing('kubejs:raw_cookie_base', ['#forge:egg', 'minecraft:sugar', 'create:wheat_flour'])
  event.smelting('kubejs:cookie_base', ['kubejs:raw_cookie_base'])
  const jaffaIncomplete = 'kubejs:incomplete_jaffa_cake'
  event.recipes.create.sequenced_assembly(
    'kubejs:jaffa_cake',
    'kubejs:cookie_base',
    [
      event.recipes.createFilling(jaffaIncomplete, [jaffaIncomplete, Fluid.of('kubejs:orange_jam', 100)]),
      event.recipes.createFilling(jaffaIncomplete, [jaffaIncomplete, Fluid.of('create:chocolate', 100)])
    ]
  ).transitionalItem(jaffaIncomplete).loops(1)


  // Coffee fixes
  event.remove({'output': 'farmersrespite:coffee_beans'})
  event.remove({'output': 'farmersrespite:coffee_berries'})

  event.custom({
    'type': 'farmersdelight:cutting',
    'ingredients': [
      {'item': 'farmersrespite:coffee_berries'}
    ],
    'result': [
      {'item': 'kubejs:coffee_seed'}
    ],
    'tool': {
      'tag': 'forge:tools/knives'
    }
  })
  event.recipes.create.cutting('kubejs:coffee_seed', 'farmersrespite:coffee_berries');

  event.smelting('farmersrespite:coffee_beans', 'kubejs:coffee_seed')

  // Lime fixes
  event.remove({'output': 'collectorsreap:lime_seeds'})

  event.shapeless('kubejs:lime_seed', ['collectorsreap:lime_slice'])
  event.shapeless('2x kubejs:lime_seed', ['collectorsreap:lime'])

  // Pomegranate fixes
  event.remove({'output': 'collectorsreap:pomegranate_seeds'})

  event.shapeless('2x kubejs:pomegranate_seed', ['collectorsreap:pomegranate_slice'])
  event.shapeless('8x kubejs:pomegranate_seed', ['collectorsreap:pomegranate'])

  // Avocado fixes
  event.remove({'output': 'culturaldelights:avocado_pit'})
  event.remove({'id': 'culturaldelights:cutting/cut_avocado'})
  event.remove({'id': 'culturaldelights:cutting/cut_avocado_using_deployer'})

  event.shapeless('kubejs:avocado_seed', ['culturaldelights:avocado'])

  event.custom({
    'type': 'farmersdelight:cutting',
    'ingredients': [
      {
        'item': 'culturaldelights:avocado'
      }
    ],
    'result': [
      Item.of('culturaldelights:cut_avocado', 2),
      Item.of('kubejs:avocado_seed')
    ],
    'tool': {
      'tag': 'forge:tools/knives'
    }
  })

})

ServerEvents.tags('item', event => {
  event.add('forge:vegetables', 'kubejs:chile_pepper')
  event.add('forge:vegetables', 'kubejs:green_pepper')

  event.remove('forge:seeds', 'kubejs:coffee_seed')

  event.add('create:blaze_burner_fuel/regular', 'kubejs:chile_pepper')
  event.add('create:blaze_burner_fuel/special', 'kubejs:roasted_chiles')
})