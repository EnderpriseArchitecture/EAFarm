// priority: 30

ServerEvents.recipes(event => {

  event.shaped(Item.of('custommachinery:custom_machine_item', {'machine': 'custommachinery:ice_machine'}),
    [
      ' C ',
      'ABA', // arg 2: the shape (array of strings)
      'DED'
    ],
    {
      'A': 'createaddition:copper_spool',
      'B': 'create:brass_casing',
      'C': 'minecraft:snow_block',
      'D': 'create:fluid_pipe',
      'E': 'create:mechanical_pump'
    }
  ).id('ice_machine_manual_only')

  event.shaped(Item.of('custommachinery:custom_machine_item', {'machine': 'custommachinery:fermenter'}),
    [
      ' B ',
      'BAB',
      ' C '
    ],
    {
      'A': 'minecraft:barrel',
      'B': '#forge:plates/copper',
      'C': 'create:fluid_tank'
    }
  ).id('fermenter_manual_only')

  /***
   * Fermenter Recipes
   **/

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('culturaldelights:cucumber'))
    .produceItem(Item.of('culturaldelights:pickle'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('culturaldelights:cut_cucumber'))
    .produceItem(Item.of('culturaldelights:cut_pickle'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('farmersdelight:cabbage_leaf'))
    .produceItem(Item.of('kubejs:sauerkraut'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('vegandelight:soybean'))
    .produceItem(Item.of('kubejs:natto'))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('minecraft:apple'))
    .requireFluid(Fluid.of('minecraft:water', 1000))
    .produceFluid(Fluid.of('kubejs:apple_cider_vinegar', 1000))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem(Item.of('vegandelight:soybean'))
    .requireFluid(Fluid.of('minecraft:water', 1000))
    .produceFluid(Fluid.of('kubejs:soy_sauce', 1000))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireFluid(Fluid.of('farmersrespite:black_tea', 1000))
    .produceFluid(Fluid.of('kubejs:kombucha', 1000))

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem({'tag': 'minecraft:sand'})
    .produceItem({'item': 'minecraft:soul_sand'})

  event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
    .requireItem({'item': 'farmersdelight:organic_compost'})
    .produceItem({'item': 'farmersdelight:rich_soil'})

  // This is overriden if alcohol is turned on.
  if(!global.showDrinks) {
    global.ricevinegar_recipe = event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
      .requireItem(Item.of('farmersdelight:rice'))
      .requireFluid(Fluid.of('minecraft:water', 1000))
      .produceFluid(Fluid.of('kubejs:rice_vinegar', 1000))
  }

  /***
   * Ice Machine Recipes
   **/

  global.standard_freezing_time = 1000
  global.standard_energy_use = 1

  event.recipes.custommachinery.custom_machine('custommachinery:ice_machine', global.standard_freezing_time)
    .requireFluid(Fluid.of('minecraft:water', 1000))
    .produceItem(Item.of('minecraft:ice'))
    .requireEnergyPerTick(global.standard_energy_use)

  const iceCreams = [
    'neapolitan:vanilla_ice_cream',
    'neapolitan:chocolate_ice_cream',
    'neapolitan:strawberry_ice_cream',
    'neapolitan:banana_ice_cream',
    'neapolitan:mint_ice_cream',
    'neapolitan:adzuki_ice_cream',
    'collectorsreap:lime_ice_cream',
    'collectorsreap:pomegranate_ice_cream',
  ]

  for(let i = 0; i < iceCreams.length; i++) {
    let iceCream = iceCreams[i]
    let mix = 'kubejs:' + iceCream.split(':')[1]

    let milkshake = iceCream.replace('ice_cream', 'milkshake')
    let mixBottle = mix + '_bottle'

    // FIX ME: this doesn't work for some reason.
    event.remove({'output': Item.of(iceCream)})
    event.remove({'output': Item.of(milkshake)})

    event.recipes.custommachinery.custom_machine('custommachinery:ice_machine', global.standard_freezing_time)
      .requireFluid(Fluid.of(mix, 250))
      .produceItem(Item.of(iceCream))
      .requireEnergyPerTick(global.standard_energy_use)

    event.recipes.custommachinery.custom_machine('custommachinery:ice_machine', global.standard_freezing_time)
      .requireItem(Item.of(mixBottle))
      .produceItem(Item.of(milkshake))
      .requireEnergyPerTick(global.standard_energy_use)
  }

  /***
   * Bank Recipes
   **/

  // These are all doable in the packager instead.
  /*
  for(let i = 0; i < global.coin_economy.length - 1; i++) {
    let smaller = 'createdeco:' + global.coin_economy[i]
    let bigger = 'createdeco:' + global.coin_economy[i + 1]

    event.recipes.custommachinery.custom_machine('custommachinery:bank', 1)
      .requireItem(Item.of(smaller, 16))
      .produceItem(Item.of(bigger))
      .requireButtonReleased('upgrade')


    event.recipes.custommachinery.custom_machine('custommachinery:bank', 1)
      .requireItem(Item.of(bigger))
      .produceItem(Item.of(smaller, 16))
      .requireButtonPressed('upgrade')
  }
  */

  /***
   * Fluid Generator
   **/

  event.recipes.custommachinery.custom_machine('custommachinery:fluid_generator', 1000)
    .requireFluidPerTick(Fluid.of('createaddition:seed_oil', 1))
    .produceEnergyPerTick(10)

})