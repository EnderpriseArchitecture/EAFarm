// priority: 100

// Visit the wiki for more info - https://kubejs.com/

/* TODO:
   * fix hot chocolate recipe : remove duplicates from confectionery and delight, and allow for vegan option, use cocoa powder?
   * make coffee spawn and grow in the overworld?
   * all the dough-related recipes should have an intermediate raw version that has to be smelted.
     * cake base already exists, start with that!
   * fix quark recipes, e.g. slime gelatin recipe that's broken
   * check all honey recipes
   * fix all the oh-the-biomes recipes
     * Allium Oddion Soup
     * Blooming Oddion
     * White Puffball Stew
     * Aloe Vera Juice
   * Fix collector's reap recipes
   * Fix every neapolitan recipe to use the mixer
   * Replace all leather/rabbit hide with #forge:leather
   * Remove all petals->wool recipes from Oh The Biomes
   * Add fried recipes with seed oil
         * Blooming Oddion
         + Blooming Onion
   * Fix sweet roll
*/

// Note: Kubejs has a couple of weirdnesses with create, notably you can't replace recipe ingredients/outputs.
// There's a lot of duplication below as a result.

global.standard_pickling_time = 500

ServerEvents.tags('item', event => {
  event.add('forge:berries', 'neapolitan:strawberries')
  event.add('forge:berries', 'neapolitan:white_strawberries')
  event.add('forge:berries', 'biomeswevegone:blueberries')

  event.add('forge:apple_slices', 'some_assembly_required:apple_slices')
  event.add('forge:apple_slices', 'kubejs:green_apple_slices')

  event.add('forge:apples', 'minecraft:apple')
  event.add('forge:apples', 'biomeswevegone:green_apple')

  // Egg stuff

  // Why aren't eggs, eggs?
  event.add('forge:eggs', 'minecraft:egg')

  // Applesauce does not make sense for most recipes.
  event.remove('forge:eggs', 'vegandelight:applesauce')

  // Except for baking
  event.add('forge:baking_eggs', 'minecraft:egg')
  event.add('forge:baking_eggs', 'vegandelight:applesauce')

  event.add('forge:cooked_eggs', 'vegandelight:silken_tofu')

  event.add('forge:cooked_bacon', 'vegandelight:cooked_smoked_tofu_slices')

  event.add('forge:vinegar_bottle', 'kubejs:rice_vinegar_bottle')
  event.add('forge:vinegar_bottle', 'kubejs:apple_cider_vinegar_bottle')

  event.add('forge:cut_vegetables', 'some_assembly_required:chopped_beetroot')
  event.add('forge:cut_vegetables', 'some_assembly_required:chopped_carrot')
  event.add('forge:cut_vegetables', 'some_assembly_required:sliced_onion')
  event.add('forge:cut_vegetables', 'some_assembly_required:tomato_slices')
  event.add('forge:cut_vegetables', 'kubejs:cut_green_pepper')

  event.add('forge:stew_vegetables', 'some_assembly_required:chopped_carrot')
  event.add('forge:stew_vegetables', 'some_assembly_required:cut_potato')
  event.add('forge:stew_vegetables', 'some_assembly_required:sliced_onion')

  event.add('forge:cut_chicken', 'farmersdelight:chicken_cuts')
  event.add('forge:cut_chicken', 'vegandelight:tofu_slices')

  event.add('forge:cod_slices', 'farmersdelight:cod_slice')
  event.add('forge:cod_slices', 'vegandelight:tofish')

  event.remove('forge:seeds', 'kubejs:black_beans_seed')
  event.add('forge:raw_beef', 'kubejs:uncooked_black_bean_patty')
  event.add('forge:cooked_beef', 'kubejs:black_bean_patty')

  // Steak is not just beef, and vice versa
  // From now on, cooked beef is actually hamburger (and black bean patties and minced tofu)
  event.remove('forge:cooked_beef', 'minecraft:cooked_beef')
  event.add('forge:cooked_steak', 'minecraft:cooked_beef')
  event.add('forge:cooked_steak', 'vegandelight:tofu')
})

ServerEvents.tags('fluid', event => {
  event.add('forge:vinegar', 'kubejs:rice_vinegar')
  event.add('forge:vinegar', 'kubejs:apple_cider_vinegar')
})

ServerEvents.recipes(event => {
  let waterBottle = Item.of('minecraft:potion', '{Potion: "minecraft:water"}').strongNBT()

  /***
   * Modify coin recipes so we can have an economy
   **/
  event.remove({ 'output': 'createdeco:zinc_coin' })
  event.remove({ 'output': 'createdeco:zinc_coinstack' })
  event.remove({ 'output': 'createdeco:copper_coin' })
  event.remove({ 'output': 'createdeco:copper_coinstack' })
  event.remove({ 'output': 'createdeco:iron_coin' })
  event.remove({ 'output': 'createdeco:iron_coinstack' })
  event.remove({ 'output': 'createdeco:gold_coin' })
  event.remove({ 'output': 'createdeco:gold_coinstack' })
  event.remove({ 'output': 'createdeco:brass_coin' })
  event.remove({ 'output': 'createdeco:brass_coinstack' })
  event.remove({ 'output': 'createdeco:industrial_iron_coin' })
  event.remove({ 'output': 'createdeco:industrial_iron_coinstack' })
  event.remove({ 'output': 'createdeco:netherite_coin' })
  event.remove({ 'output': 'createdeco:netherite_coinstack' })

  // Zinc -> Copper -> Iron -> Brass -> Industrial Iron -> Gold -> Netherite
  global.coin_economy = [
    'zinc_coin',
    'copper_coin',
    'iron_coin',
    'brass_coin',
    'industrial_iron_coin',
    'gold_coin',
    'netherite_coin'
  ]

  function compacted(event, output, input) {
    let id = output.replace(':', '_')
    event.shaped(
      Item.of(output),
      [
        'AA ',
        'AA', // arg 2: the shape (array of strings)
        '   '
      ],
      {
        'A': input,
      }
    ).id('compacted_' + id + '_manual_only')
  }

  // 8 x smaller coin -> 1 smaller coin stack; 8 x smaller coin stack -> 1 bigger coin
  // The 64 x smaller coin -> 1 bigger coin recipe only appears to work in the mixer for some reason.
  // Must be a shortcoming in Minecraft itself? Is there a mod to fix this, to use stacks as inputs?
  for(let i = 0; i < global.coin_economy.length - 1; i++) {
    let smaller = 'createdeco:' + global.coin_economy[i]
    let bigger  = 'createdeco:' + global.coin_economy[i + 1]

    event.shapeless('16x ' + smaller, [bigger])
    event.shapeless(bigger, [Item.of(smaller, 16)])

    event.shapeless(smaller + 'stack', [Item.of(smaller, 4)])
    event.shapeless('4x ' + smaller, [Item.of(smaller + 'stack', 1)])
    event.shapeless(bigger, [Item.of(smaller + 'stack', 4)])

    compacted(event, smaller + 'stack', smaller)
    compacted(event, bigger, smaller + 'stack')

  }

  /***
   * Better wheat recipes
   ***/

  // Get straw from wheat not just rice
  event.custom({
    'type': 'farmersdelight:cutting',
    'ingredients': [
      {
        'item': 'minecraft:wheat'
      }
    ],
    'result': [
      {
        'item': 'minecraft:wheat_seeds'
      },
      {
        'item': 'farmersdelight:straw'
      }
    ],
    'tool': {
      'tag': 'forge:tools/knives'
    }
  })

  // Remove default recipes
  event.remove({
    'input': 'minecraft:wheat',
    'output': 'minecraft:bread'
  })

  // Replace wheat with flour in recipes.

  // event.replaceInput(
  //   { input: 'minecraft:wheat', output: 'minecraft:cookie' },
  //   'minecraft:wheat',
  //   'create:wheat_flour'
  // )

  event.replaceInput(
    { input: 'minecraft:wheat', output: 'minecraft:cake' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  event.replaceInput(
    { input: 'minecraft:wheat', output: 'farmersrespite:coffee_cake' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  event.replaceInput(
    { input: 'minecraft:wheat', output: 'farmersdelight:wheat_dough' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  event.replaceInput(
    { input: 'minecraft:wheat', output: 'farmersdelight:pie_crust' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  event.remove({'output': 'farmersdelight:raw_pasta'})
  event.custom({
    'type': 'createaddition:rolling',
    'input': {'item': 'create:dough'},
    'result': {'item': 'kubejs:dough_sheet'}
  })
  event.custom({
    'type': 'createaddition:rolling',
    'input': {'item': 'kubejs:dough_sheet'},
    'result': {'item': 'farmersdelight:raw_pasta'}
  })

  event.recipes.create.mixing(
    'kubejs:cooked_pasta',
    ['farmersdelight:raw_pasta', {'fluid': 'minecraft:water', 'amount': 250}]
  ).heated()

  event.remove({'output': 'some_assembly_required:burger_bun'})
  event.shapeless('kubejs:uncooked_burger_bun', ['create:dough', '#forge:seeds'])
  event.smelting('some_assembly_required:burger_bun', 'kubejs:uncooked_burger_bun')

  // Better corn dough receipe

  event.remove({'output': 'culturaldelights:corn_dough'})
  event.shapeless('culturaldelights:corn_dough', ['kubejs:corn_flour', Item.of('minecraft:potion', '{Potion: "minecraft:water"}').strongNBT()])
  event.custom({
    'type': 'create:mixing',
    'ingredients': [
      {
        'item': 'kubejs:corn_flour'
      },
      {
        'amount': 100,
        'fluid': 'minecraft:water'
      }
    ],
    'results': [
      {'item': 'culturaldelights:corn_dough'}
    ]
  })

  event.remove({'output': 'culturaldelights:tortilla'})
  event.custom({
    'type': 'createaddition:rolling',
    'input': {'item': 'culturaldelights:corn_dough'},
    'result': {'item': 'kubejs:raw_tortilla'}
  })

  event.smelting('culturaldelights:tortilla', 'kubejs:raw_tortilla')

  event.replaceInput(
    { input: 'minecraft:wheat', output: 'quarkdelight:bucket_of_sweet_gelatine' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  // We have too many dough recipes.
  event.remove({ type: 'create:mixing', output: 'create:dough' })
  event.custom({
    'type': 'create:mixing',
    'ingredients': [
      {
        'item': 'create:wheat_flour'
      },
      {
        'amount': 100,
        'fluid': 'minecraft:water'
      }
    ],
    'results': [
      {'item': 'create:dough'}
    ]
  })

  event.remove({ output: 'farmersdelight:wheat_dough' })

  event.remove({ 'output': 'minecraft:beetroot_soup'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'container': {'item': 'bowl'},
    'ingredients': [{'item': 'some_assembly_required:chopped_beetroot'}, waterBottle],
    'result': {'item': 'minecraft:beetroot_soup'}
  })
  event.recipes.create.mixing('minecraft:beetroot_soup', [{'item': 'some_assembly_required:chopped_beetroot'}, {'fluid': 'minecraft:water', 'amount': 250}, 'minecraft:bowl']).heated()

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'container': {'item': 'bowl'},
    'ingredients': [{'item': 'kubejs:black_beans_seed'}, waterBottle],
    'result': {'item': 'kubejs:black_bean_soup'}
  })
  event.recipes.create.mixing('kubejs:black_bean_soup', [{'item': 'kubejs:black_beans_seed'}, {'fluid': 'minecraft:water', 'amount': 250}, 'minecraft:bowl']).heated()

  event.remove({'id': 'vegandelight:cooking/applesauce'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'container': {'item': 'bowl'},
    'ingredients': [{'item': 'some_assembly_required:apple_slices'}, {'item': 'minecraft:sugar'}, waterBottle],
    'result': {'item': 'vegandelight:applesauce'}
  })
  // event.replaceInput({'id': 'vegandelight:cooking/applesauce'}, 'minecraft:water_bucket', waterBottle)

  event.shapeless('kubejs:mashed_potatoes', ['minecraft:bowl', 'kubejs:mashed_potatoes_bottle'])
  event.shapeless('4x kubejs:mashed_potatoes', ['4x minecraft:bowl', 'kubejs:mashed_potatoes_bucket'])
  event.recipes.create.filling('kubejs:mashed_potatoes', ['minecraft:bowl', Fluid.of('kubejs:mashed_potatoes', 250)])

  // Make sure you can get seeds from the fruits of plants

  event.shapeless('4x neapolitan:strawberry_pips', ['neapolitan:strawberries'])
  event.shapeless('4x neapolitan:mint_sprout', ['neapolitan:mint_leaves'])
  event.shapeless('4x culturaldelights:cucumber_seeds', ['culturaldelights:cucumber'])
  event.shapeless('2x culturaldelights:cucumber_seeds', ['culturaldelights:cut_cucumber'])
  event.shapeless('4x farmersdelight:cabbage_seeds', ['farmersdelight:cabbage'])
  event.remove({'type': 'minecraft:crafting_shapeless', 'output': 'farmersdelight:tomato_seeds'})
  event.shapeless('4x farmersdelight:tomato_seeds', ['farmersdelight:tomato'])


  // Fix Biomass
  event.remove({'output': 'createaddition:biomass'})
  event.remove({'output': Fluid.of('createaddition:bioethanol')})
  event.recipes.create.compacting('createaddition:biomass', ['#createaddition:plants']).heated()
  event.recipes.create.mixing(Fluid.of('createaddition:bioethanol', 250), ['createaddition:biomass', Fluid.of('createaddition:seed_oil', 125)]).heated()

  // Add a better rice recipe
  event.remove({'output': 'farmersdelight:cooked_rice'})

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    // 'container': {'item': 'bowl'},
    'ingredients': [
      {'item': 'farmersdelight:rice'},
      waterBottle
    ],
    'result': {'item': 'farmersdelight:cooked_rice'}
  })
  event.recipes.create.mixing('farmersdelight:cooked_rice',
    [
      {fluid: 'minecraft:water', amount:250},
      'farmersdelight:rice'
    ]).heated()

  // Fix gummies
  event.forEachRecipe({ type: 'farmersdelight:cooking' }, recipe => {
    let output = recipe.originalRecipeResult

    if(!output.id.match('gummy')) return

    // This doesn't work for some reason. We have to rebuild the recipe instead.
    // event.replaceInput(
    //   { 'id': recipe.getOrCreateId() },
    //   'minecraft:honey_bottle',
    //   'kubejs:corn_starch'
    // )

    let inputs = [];
    for(let i = 0; i < recipe.originalRecipeIngredients.length; i++) {
      let ingredient = recipe.originalRecipeIngredients[i];
      let ingredientName = Item.of(ingredient).id

      if(ingredientName.match(/honey/) || ingredientName.match('kelp')) continue;

      if(ingredientName.match(/chocolate/)) ingredientName = 'create:bar_of_chocolate';

      inputs.push({'item': ingredientName});
    }

    inputs.push({'item': 'minecraft:slime_ball'})

    event.remove({ 'output': output.id })
    event.custom({
      'type': 'farmersdelight:cooking',
      'cookingtime': 200,
      'experience': 1,
      'ingredients': inputs,
      'result': {item: output.id}
    })
  })

  // Missing gummy recipes
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'minecraft:slime_ball'},
      {'item': 'minecraft:sugar'},
      {'item': 'farmersdelight:pumpkin_slice'}
    ],
    'result': {item: 'collectorsreap:pumpkin_gummy'}
  })

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'minecraft:slime_ball'},
      {'item': 'minecraft:sugar'},
      {'item': 'minecraft:sweet_berries'}
    ],
    'result': {item: 'collectorsreap:sweet_berry_gummy'}
  })

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'minecraft:slime_ball'},
      {'item': 'minecraft:sugar'},
      {'item': 'some_assembly_required:chopped_beetroot'}
    ],
    'result': {item: 'collectorsreap:beetroot_gummy'}
  })

  // Fix vegan recipes that use farmersdelight:cooking. These automatically create:mixer recipes that are wrong
  // and use only the vegan type of ingredient, eliminating the forge tag entirely.

  event.replaceInput(
    { input: 'minecraft:milk' },
    'minecraft:milk',
    '#forge:milk'
  )

  event.replaceInput(
    { input: 'create:honey' },
    'create:honey',
    '#forge:honey'
  )

  event.replaceInput(
    { input: 'cyclic:honey' },
    'cyclic:honey',
    '#forge:honey'
  )

  /***
   * Misc cooking recipes.
   **/

  event.remove({'output': 'farmersdelight:roast_chicken'})
  event.shapeless('kubejs:uncooked_roast_chicken', ['#forge:raw_chicken', 'some_assembly_required:sliced_onion', 'kubejs:cut_potato', 'some_assembly_required:chopped_carrot'])
  event.smelting('farmersdelight:roast_chicken', 'kubejs:uncooked_roast_chicken')

  event.recipes.create.filling('kubejs:uncooked_dumplings', [Fluid.of('kubejs:dumpling_filling', 500), '#forge:dough'])
  event.remove({ 'output': 'farmersdelight:dumplings' }) // This doesn't remove the mixing recipe and I can't figure out why.
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [{'item': 'kubejs:uncooked_dumplings'}],
    'result': {'item': 'farmersdelight:dumplings'}
  })

  // This doesn't work, I don't know why.
  // event.replaceInput({'output': 'culturaldelights:spicy_curry'}, 'minecraft:blaze_powder', 'kubejs:chile_powder')

  event.remove({'output': 'culturaldelights:spicy_curry'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [{'item': 'kubejs:chile_paste_bottle'}, {'item': 'some_assembly_required:sliced_onion'}, {'item': 'farmersdelight:cooked_rice'}, {'item': 'kubejs:cut_potato'}, {'item': 'kubejs:cut_green_pepper'}],
    'result': {'item': 'culturaldelights:spicy_curry'}
  })
  event.recipes.create.mixing('culturaldelights:spicy_curry', [{'fluid': 'kubejs:chile_paste', 'amount': 250}, {'item': 'some_assembly_required:sliced_onion'}, {'item': 'farmersdelight:cooked_rice'}, {'item': 'kubejs:cut_potato'}, {'item': 'kubejs:cut_green_pepper'}]).heated()

  // Fix mushroom rice
  event.remove({'id': 'sliceanddice:cooking/farmersdelight/cooking/mushroom_rice'})
  event.remove({'id': 'farmersdelight:cooking/mushroom_rice'})

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'tag': 'forge:stew_vegetables'},
      {'item': 'minecraft:brown_mushroom'},
      {'item': 'minecraft:red_mushroom'},
      {'item': 'farmersdelight:rice'},
      waterBottle
    ],
    'result': {'item': 'farmersdelight:mushroom_rice'}
  })

  event.recipes.create.mixing('farmersdelight:mushroom_rice', [
    {'tag': 'forge:stew_vegetables'},
    {'item': 'minecraft:brown_mushroom'},
    {'item': 'minecraft:red_mushroom'},
    {'item': 'farmersdelight:rice'},
    Fluid.of('minecraft:water', 250)
  ]).heated()

  // Fix fried rice
  event.remove({'output': 'farmersdelight:fried_rice'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'some_assembly_required:chopped_carrot'},
      {'item': 'culturaldelights:corn_kernels'},
      {'item': 'farmersdelight:rice'},
      {'tag': 'forge:eggs'},
    ],
    'result': {'item': 'farmersdelight:fried_rice'}
  })

  // Fix noodle soup
  event.remove({'output': 'farmersdelight:noodle_soup'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'tag': 'forge:raw_pork'},
      {'item': 'kubejs:cooked_pasta'},
      {'tag': 'forge:cooked_eggs'},
      {'item': 'minecraft:dried_kelp'},
      {'item': 'culturaldelights:corn_kernels'},
      waterBottle
    ],
    'result': {'item': 'farmersdelight:noodle_soup'}
  })
  event.recipes.create.mixing('farmersdelight:noodle_soup', [
      {'tag': 'forge:raw_pork'},
      {'item': 'kubejs:cooked_pasta'},
      {'tag': 'forge:cooked_eggs'},
      {'item': 'minecraft:dried_kelp'},
      {'item': 'culturaldelights:corn_kernels'},
      {'item': 'minecraft:bowl'},
      Fluid.of('minecraft:water', 250)
  ]).heated()

  // Fix vegetable soup
  event.remove({'output': 'farmersdelight:vegetable_soup'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'some_assembly_required:chopped_carrot'},
      {'item': 'some_assembly_required:chopped_beetroot'},
      {'tag': 'forge:cut_vegetables'},
      waterBottle
    ],
    'result': {'item': 'farmersdelight:vegetable_soup'}
  })
  event.recipes.create.mixing('farmersdelight:vegetable_soup', [
      {'item': 'some_assembly_required:chopped_carrot'},
      {'item': 'some_assembly_required:chopped_beetroot'},
      {'tag': 'forge:cut_vegetables'},
      {'item': 'minecraft:bowl'},
      Fluid.of('minecraft:water', 250)
  ]).heated()

  // Fix chicken soup
  event.remove({'output': 'farmersdelight:chicken_soup'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'tag': 'forge:raw_chicken'},
      {'item': 'some_assembly_required:chopped_carrot'},
      {'tag': 'forge:stew_vegetables'},
      {'tag': 'forge:cut_vegetables'},
      waterBottle
    ],
    'result': {'item': 'farmersdelight:chicken_soup'}
  })
  event.recipes.create.mixing('farmersdelight:chicken_soup', [
      {'tag': 'forge:raw_chicken'},
      {'item': 'some_assembly_required:chopped_carrot'},
      {'tag': 'forge:stew_vegetables'},
      {'tag': 'forge:cut_vegetables'},
      {'item': 'minecraft:bowl'},
      Fluid.of('minecraft:water', 250)
  ]).heated()

  // Fix wild rice soup
  event.remove({'output': 'collectorsreap:portobello_rice_soup'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'some_assembly_required:chopped_carrot'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:rice'},
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'minecraft:dried_kelp'},
      waterBottle
    ],
    'result': {'item': 'collectorsreap:portobello_rice_soup'}
  })
  event.recipes.create.mixing('collectorsreap:portobello_rice_soup', [
      {'item': 'some_assembly_required:chopped_carrot'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:rice'},
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'minecraft:dried_kelp'},
      {'item': 'minecraft:bowl'},
      Fluid.of('minecraft:water', 250)
  ]).heated()

  // Fix portobello risotto
  event.remove({'output': 'collectorsreap:portobello_risotto'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:rice'},
      {'tag': 'forge:milk/milk_bottle'}
    ],
    'result': {'item': 'collectorsreap:portobello_risotto'}
  })
  event.recipes.create.mixing('collectorsreap:portobello_risotto', [
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:rice'},
      {'item': 'minecraft:bowl'},
      {'fluidTag': 'forge:milk', 'amount' : 250}
  ]).heated()

  // Fix pasta with mushroom
  event.remove({'output': 'collectorsreap:portobello_pasta'})
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:raw_pasta'},
      {'item': 'minecraft:brown_mushroom'},
      {'tag': 'forge:milk/milk_bottle'},
    ],
    'result': {'item': 'collectorsreap:portobello_pasta'}
  })
  event.recipes.create.mixing('collectorsreap:portobello_pasta', [
      {'item': 'collectorsreap:baked_portobello_cap'},
      {'item': 'some_assembly_required:sliced_onion'},
      {'item': 'farmersdelight:raw_pasta'},
      {'item': 'minecraft:brown_mushroom'},
      {'item': 'minecraft:bowl'},
      {'fluidTag': 'forge:milk', 'amount' : 250}
  ]).heated()

   // Require heat to make tomato sauce
  event.remove({'output': Fluid.of('create_central_kitchen:tomato_sauce', 250)})
  event.remove({'input': 'farmersdelight:tomato', 'output': 'farmersdelight:tomato_sauce'})
  event.recipes.create.mixing(Fluid.of('create_central_kitchen:tomato_sauce', 250), '2x farmersdelight:tomato').heated()


  // Add liquids instead of bottles

  event.forEachRecipe({ type: 'farmersdelight:cooking' }, recipe => {
    let inputs = []
    let output = recipe.originalRecipeResult

    if(!output) return;

    let liquid = false

    for(let i = 0; i < recipe.originalRecipeIngredients.length; i++) {
      let ingredient = recipe.originalRecipeIngredients[i];
      let ingredientName = Item.of(ingredient).id

      switch(ingredientName) {
        // Replace soymilk buckets with any milk-like thing.
        case 'vegandelight:soymilk_bucket':
          ingredient = {'fluidTag': 'forge:milk', 'amount': 250}
          liquid = true
          break

        // Replace bowls of tomato sauce with liquid.
        case 'farmersdelight:tomato_sauce':
          ingredient = {'fluid': 'create_central_kitchen:tomato_sauce', 'amount': 250}
          liquid = true
          break

        // Replace water bottles with water.

      }

      inputs.push(ingredient)
    }

    // Stews & soups should have a liquid of some sort.
    if(!liquid && (output.id.includes('stew') || output.id.includes('soup'))) {
      inputs.push({'fluid': 'minecraft:water', 'amount': 250})
    }

    event.recipes.create.mixing(output, inputs).heated()
  })

  // Expanded Some Assembly Required recipes for Farmers Delight sandwiches.

  for(let i = 0; i < global.betterRecipes.length; i++) {
    let recipe = global.betterRecipes[i]
    let id = recipe[0]

    let ingredients = recipe[1]
    let incomplete = recipe[2]
    if(!incomplete) {
      incomplete = 'kubejs:incomplete_' + id.split(':')[1]
    }
    let sandwich = recipe[3]

    // Allow shapeless versions of these
    console.log('fix '+ id)
    event.remove({'output': id})
    event.shapeless(id, ingredients).id(id + '_shapeless_manual_only')

    // Most sandwiches and things need a piece of bread/etc. on top and bottom.

    let baseIngredient = ingredients[0].replace(/^[0-9]x /, '')

    let top = ingredients[0]
    let bottom = ingredients[0]

    // Burger buns needs to be split.
    switch(ingredients[0]) {
      case 'some_assembly_required:burger_bun':
        top = 'some_assembly_required:burger_bun_top'
        bottom = 'some_assembly_required:burger_bun_bottom'
        break
    }

    // Build our assembly steps.
    let steps = []

    for(let j = 1; j < ingredients.length; j++) {

      // Bottled ingredients are liquids and should be filled instead.
      if(ingredients[j].match(/_bottle$/)) {
        let fluid = ingredients[j].replace('_bottle', '')
        let fluidIngredient = {'fluid': fluid, 'amount': 50}

        // Make sure to handle fluid tags.
        if(fluid.match(/^#/)) {
          fluidIngredient = {'fluidTag': fluid.substring(1), 'amount': 50}
        }
        steps.push(event.recipes.createFilling(incomplete, [incomplete, fluidIngredient]))
      }
      // Everything else is stacked on top.
      else {
        steps.push(event.recipes.createDeploying(incomplete, [incomplete, ingredients[j]]))
      }
    }

    // If this is a sandwich or otherwise, we cap it with the top item.
    if(sandwich) {
      steps.push(event.recipes.createDeploying(incomplete, [incomplete, top]))
    }

    // Finally, build the sequence.
    event.recipes.create.sequenced_assembly(
      id,
      bottom, // The first ingredient in the list is the one we start with.
      steps
    ).transitionalItem(incomplete).loops(1)

  }

  /***
   * Salt
   **/

  // The recipe for salt as water in a heated mixer is prone to conflicts, so we need another way to make salt.
  // Removing salt recipes until I think of a better way which has less conflicts.
  // Custom machine?  Dehydrator maybe?

  // Replace all recipes using salt.
  event.remove({ 'mod': 'vegandelight', 'output': 'vegandelight:salt' })

  event.remove({ 'input': 'vegandelight:salt' })
  event.recipes.create.compacting('vegandelight:tofu', [Fluid.of('vegandelight:soymilk', 1000)]).heated()

  event.remove({ 'mod': 'vegandelight', 'output': 'vegandelight:silken_tofu' })
  event.recipes.create.mixing('vegandelight:silken_tofu', [Fluid.of('minecraft:water', 250), 'vegandelight:tofu']).heated()

  /***
   * Extra Foods
   **/

  event.recipes.create.milling('kubejs:corn_flour', 'culturaldelights:corn_kernels')
  event.recipes.create.milling('kubejs:corn_starch', 'kubejs:corn_flour')

  event.remove({'output': 'minecraft:slime_ball'})

  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [{'item': 'kubejs:corn_starch'}, Item.of('minecraft:potion', '{Potion: "minecraft:water"}').strongNBT()],
    'result': {'item': 'minecraft:slime_ball'}
  })
  event.recipes.create.mixing('minecraft:slime_ball', [
    {'fluid': 'minecraft:water', amount:250},
    'kubejs:corn_starch'
  ]).heated()

  event.recipes.create.mixing({fluid: 'kubejs:sweet_cream', amount:1000}, [
    {'fluidTag': 'forge:milk', amount:1000},
    'minecraft:sugar'
  ]).heated()

  event.shapeless('kubejs:berries_and_cream', ['#forge:milk', 'minecraft:sugar', '#forge:berries'])
  event.recipes.create.mixing('kubejs:berries_and_cream', [
    {'fluid': 'kubejs:sweet_cream', amount:1000},
    '#forge:berries'
  ])

  event.recipes.create.mixing('kubejs:guacamole', [
    'culturaldelights:cut_avocado',
    'some_assembly_required:sliced_onion',
    'some_assembly_required:tomato_slices',
    {'fluid': 'kubejs:lime_juice', 'amount': 100}
  ])

  event.shapeless('kubejs:chips_and_guacamole', ['culturaldelights:tortilla_chips', 'kubejs:guacamole'])

  for(let i = 0; i < global.foodFluids.length; i++) {
    let fluid = global.foodFluids[i]

    if(fluid.method == 'mixing') {
      let mix = event.recipes.create.mixing({'fluid': 'kubejs:' + fluid.name, 'amount': 250}, fluid.ingredients)
      if(fluid.heated) {
        mix.heated()
      }
    }
    else if(fluid.method == 'crushing') {
      let mix = event.recipes.create.compacting({'fluid': 'kubejs:' + fluid.name, 'amount': 250}, fluid.ingredients)
      if(fluid.heated) {
        mix.heated()
      }
    }

    // Bottled version
    let bottleResult = 'kubejs:' + fluid.name + '_bottle'
    if(fluid.bottle) {
      bottleResult = fluid.bottle
      event.remove({'output': bottleResult})
    }
    event.recipes.create.filling(bottleResult, [Fluid.of('kubejs:' + fluid.name, 250), 'minecraft:glass_bottle'])
    event.recipes.create.emptying([Fluid.of('kubejs:' + fluid.name, 250), 'minecraft:glass_bottle'], bottleResult)
  }

  // Fix melons & melon juice.
  event.remove([{'output': 'minecraft:melon_slice'}])
  event.remove([{'output': Fluid.of('farmersrespite:melon_juice')}])
  event.remove([{'output': 'farmersdelight:melon_juice'}])


  event.recipes.create.compacting({'fluid': 'farmersrespite:melon_juice', 'amount': 250}, ['minecraft:melon_slice'])
  event.recipes.create.filling('farmersdelight:melon_juice', [Fluid.of('farmersrespite:melon_juice', 250), 'minecraft:glass_bottle'])

  // Seed oil - tiny bottles!
  event.recipes.shapeless('8x kubejs:oil_bottle', ['createaddition:seed_oil_bucket', '8x minecraft:glass_bottle'])
  event.recipes.create.filling('kubejs:oil_bottle', [Fluid.of('createaddition:seed_oil', 125), 'minecraft:glass_bottle'])
  event.recipes.create.emptying([Fluid.of('createaddition:seed_oil', 125), 'minecraft:glass_bottle'], 'kubejs:oil_bottle')

  /***
   * Cake Recipes
   **/

  const cakes = [
    ['minecraft:cake', 'kubejs:frosting'],
    ['createaddition:chocolate_cake', 'create:chocolate'],
    ['neapolitan:vanilla_cake', 'kubejs:vanilla_frosting'],
    ['neapolitan:chocolate_cake', false],
    ['neapolitan:banana_cake', 'kubejs:banana_frosting'],
    ['neapolitan:strawberry_cake', 'kubejs:strawberry_frosting'],
    ['neapolitan:mint_cake', 'kubejs:mint_frosting'],
    ['neapolitan:adzuki_cake', 'kubejs:adzuki_frosting'],
    ['farmersrespite:coffee_cake', 'kubejs:coffee_frosting'],
    ['collectorsreap:lime_cake', 'kubejs:lime_frosting'],
    ['collectorsreap:pomegranate_cake', 'kubejs:pomegranate_frosting']
  ];

  // Frosting recipes
  event.recipes.create.mixing({'fluid': 'kubejs:frosting', 'amount': 250}, [
    'minecraft:sugar',
    'minecraft:egg'
  ])

  // Vegan version
  event.recipes.create.mixing({'fluid': 'kubejs:frosting', 'amount': 250}, [
    'minecraft:sugar',
    'create:wheat_flour',
    {
      'amount': 250,
      'fluid': 'vegandelight:soymilk'
    }
  ])

  for(let i = 0; i < global.frostings.length; i++) {
    let frosting = global.frostings[i]

    event.recipes.create.mixing({'fluid': 'kubejs:' + frosting.name + '_frosting', 'amount': 250}, [
      frosting.ingredient,
      {
        'amount': 250,
        'fluid': 'kubejs:frosting'
      }
    ])
  }

  for(let i = 0; i < cakes.length; i++) {
    let output = cakes[i][0]
    let input = cakes[i][1]

    // Remove any non-mixed recipes.
    event.remove({'output': output});

    if(input) {
      event.recipes.create.filling(output, ['createaddition:cake_base_baked', {'fluid': input, 'amount': 250}])
    }
  }

  /***
   * Pie Recipes
   **/

  for(let i = 0; i < global.pies.length; i++) {
    let pie = global.pies[i];
    let uncooked = 'kubejs:uncooked_' + pie.name.split(':')[1];

    // Remove any non-mixed recipes.
    event.remove({'output': pie.name});

    event.recipes.create.filling(uncooked, ['farmersdelight:pie_crust', {'fluid': pie.filling, 'amount': 250}])
    event.smelting(pie.name, uncooked)
  }

  // Cheesecake flavors
  event.remove({'output': 'farmersdelight:sweet_berry_cheesecake'})

  const cheesecakes = [
    {'name': 'farmersdelight:sweet_berry_cheesecake', 'topping': 'kubejs:sweet_berry_jam'},
    {'name': 'kubejs:strawberry_cheesecake', 'topping': 'kubejs:strawberry_jam'},
    {'name': 'kubejs:blueberry_cheesecake', 'topping': 'kubejs:blueberry_jam'}
  ]

  for(let i = 0; i < cheesecakes.length; i++) {
    let cheesecake = cheesecakes[i];
    event.recipes.create.filling(cheesecake.name, ['kubejs:uncooked_cheesecake', {'fluid': cheesecake.topping, 'amount': 250}])

    event.custom({
      'type': 'farmersdelight:cutting',
      'ingredients': [
        {
          'item': cheesecake.name
        }
      ],
      'result': [
        Item.of(cheesecake.name + '_slice', 8)
      ],
      'tool': {
        'tag': 'forge:tools/knives'
      }
    })
    event.recipes.create.cutting(Item.of(cheesecake.name + '_slice', 8), cheesecake.name);
  }

  /***
   * Slices of Things
   **/

  // Many of our things need to be sliced.
  // Some things have silly slicing recipes with poor quantites.
  // We fix all of these here.
  const sliceable = [
    ['minecraft:cake', 'farmersdelight:cake_slice', 8],
    ['createaddition:chocolate_cake', 'create_central_kitchen:chocolate_cake_slice', 8],
    ['neapolitan:vanilla_cake', 'kubejs:vanilla_cake_slice', 8],
    // ['neapolitan:chocolate_cake', 'neapolitan:chocolate_cake', 8],
    ['neapolitan:banana_cake', 'neapolitan:banana_cake', 8],
    ['neapolitan:strawberry_cake', 'neapolitan:strawberry_cake', 8],
    ['neapolitan:mint_cake', 'neapolitan:mint_cake', 8],
    ['neapolitan:adzuki_cake', 'neapolitan:adzuki_cake', 8],
    ['farmersrespite:coffee_cake', 'farmersrespite:coffee_cake_slice', 8],
    ['collectorsreap:lime_cake', 'collectorsreap:lime_cake', 8],
    ['collectorsreap:pomegranate_cake', 'collectorsreap:pomegranate_cake', 8],
    ['createaddition:honey_cake', 'create_central_kitchen:honey_cake_slice', 8],

    ['minecraft:pumpkin_pie', 'create_central_kitchen:pumpkin_pie_slice', 8],
    ['farmersrespite:rose_hip_pie', 'farmersrespite:rose_hip_pie_slice', 8],
    ['farmersdelight:apple_pie', 'farmersdelight:apple_pie_slice', 8],
    ['farmersdelight:chocolate_pie', 'farmersdelight:chocolate_pie_slice', 8],
    ['collectorsreap:lime_pie', 'collectorsreap:lime_pie_slice', 8],
    ['biomeswevegone:green_apple_pie', 'biomeswevegone:green_apple_pie_slice', 8],
    ['biomeswevegone:blueberry_pie', 'biomeswevegone:blueberry_pie_slice', 8],
    ['collectorsreap:portobello_quiche', 'collectorsreap:portobello_quiche_slice', 8],

    ['kubejs:cheesecake', 'kubejs:cheesecake_slice', 8],
    ['farmersdelight:sweet_berry_cheesecake', 'farmersdelight:sweet_berry_cheesecake_slice', 8],
    ['kubejs:strawberry_cheesecake', 'kubejs:strawberry_cheesecake_slice', 8],
    ['kubejs:blueberry_cheesecake', 'kubejs:blueberry_cheesecake_slice', 8],

    ['minecraft:apple', 'some_assembly_required:apple_slices', 4],
    ['minecraft:melon', 'minecraft:melon_slice', 4],
    ['biomeswevegone:green_apple', 'kubejs:green_apple_slices', 4],
    ['farmersdelight:onion', 'some_assembly_required:sliced_onion', 4],
    ['minecraft:beetroot', 'some_assembly_required:chopped_beetroot', 4],
    ['minecraft:carrot', 'some_assembly_required:chopped_carrot', 4],
    ['minecraft:golden_carrot', 'some_assembly_required:chopped_golden_carrot', 4],
    ['farmersdelight:tomato', 'some_assembly_required:tomato_slices', 4],
    ['culturaldelights:cucumber', 'culturaldelights:cut_cucumber', 4],
    ['culturaldelights:pickle', 'culturaldelights:cut_pickle', 8],
    ['collectorsreap:lime', 'collectorsreap:lime_slice', 4],

    ['minecraft:potato', 'kubejs:cut_potato', 4],
    ['kubejs:cut_potato', 'kubejs:sliced_potato', 1],
    ['kubejs:chile_pepper', 'kubejs:cut_chile_pepper', 4],
    ['kubejs:green_pepper', 'kubejs:cut_green_pepper', 4],
    ['culturaldelights:tortilla', 'kubejs:tortilla_pieces', 4]
  ]

  for(let i = 0; i < sliceable.length; i++) {
    let input = sliceable[i][0]
    let output = sliceable[i][1]
    let amount = sliceable[i][2]

    // remove the old recipe
    event.remove({'output': output});

    event.custom({
      'type': 'farmersdelight:cutting',
      'ingredients': [
        Item.of(input)
      ],
      'result': [
        Item.of(output, amount)
      ],
      'tool': {
        'tag': 'forge:tools/knives'
      }
    })
    // event.recipes.create.cutting(Item.of(output, amount), input);

    event.remove({'id': 'culturaldelights:cutting/cut_eggplant'})
    event.custom({
      'type': 'farmersdelight:cutting',
      'ingredients': [
        Item.of('culturaldelights:eggplant')
      ],
      'result': [
        Item.of('culturaldelights:cut_eggplant', 2),
        Item.of('culturaldelights:eggplant_seeds',2)
      ],
      'tool': {
        'tag': 'forge:tools/knives'
      }
    })
  }

  /***
   * Sushi Rice
   **/

  event.custom({
    'type': 'create:mixing',
    'ingredients': [
      {
        'item': 'farmersdelight:cooked_rice'
      },
      {
        'amount': 100,
        'fluid': 'kubejs:rice_vinegar'
      }
    ],
    'results': [
      {'item': 'kubejs:sushi_rice'}
    ]
  })


  /***
   * Neapolitan Recipes (and others)
   **/

  // TODO: Some of these recipes are just silly. Fix them.

  'neapolitan:strawberry_bean_bonbons'
  'neapolitan:vanilla_pudding'
  'neapolitan:banana_bread'
  'neapolitan:adzuki_bun'
  'neapolitan:vanilla_fudge'
  'neapolitan:strawberry_scones'
  'neapolitan:milk_bottle'
  'collectorsreap:custard'
  'collectorsreap:limeade'
  'collectorsreap:mint_limeade'
  'collectorsreap:berry_limeade'
  'collectorsreap:pink_limeade'
  'collectorsreap:pomegranate_smoothie'
  'collectorsreap:lime_milkshake'
  'collectorsreap:pomegranate_milkshake'
  'collectorsreap:potato_fritters'

  event.remove({'output': 'neapolitan:neapolitan_ice_cream', 'type': 'minecraft:crafting_shapeless'})
  event.recipes.create.sequenced_assembly(
    ['neapolitan:neapolitan_ice_cream'],
    ['neapolitan:vanilla_ice_cream'],
    [
      event.recipes.createDeploying('kubejs:incomplete_neapolitan_ice_cream', ['kubejs:incomplete_neapolitan_ice_cream', 'neapolitan:chocolate_ice_cream']),
      event.recipes.createDeploying('kubejs:incomplete_neapolitan_ice_cream', ['kubejs:incomplete_neapolitan_ice_cream', 'neapolitan:strawberry_ice_cream']),
    ]
  ).transitionalItem('kubejs:incomplete_neapolitan_ice_cream').loops(1)

  // Note: Ice cream recipes are handled in server_machines.js!

  event.remove({'output': 'neapolitan:chocolate_strawberries', 'type': 'minecraft:crafting_shapeless'})
  event.recipes.create.filling('neapolitan:chocolate_strawberries', [Fluid.of('create:chocolate', 250), 'neapolitan:strawberries'])

  event.remove({'output': 'neapolitan:chocolate_spider_eye', 'type': 'minecraft:crafting_shapeless'})
  event.recipes.create.filling('neapolitan:chocolate_spider_eye', [Fluid.of('create:chocolate', 250), 'minecraft:spider_eye'])

  event.remove({'output': 'cyclic:apple_chocolate', 'type': 'minecraft:crafting_shaped'})
  event.recipes.create.filling('cyclic:apple_chocolate', [Fluid.of('create:chocolate', 250), 'minecraft:apple'])

  event.remove({'output': 'neapolitan:mint_chocolate'})
  event.recipes.create.mixing('neapolitan:mint_chocolate', [Fluid.of('create:chocolate', 250), 'neapolitan:mint_leaves']).heated()

  // We have a create chocolate bar, so remove the neapolitan one.
  event.remove({'output': 'neapolitan:chocolate_bar'})

  // Other recipes should use mixing not shapeless.

  const heatedRecipes = [
    'neapolitan:mint_candies',
    'neapolitan:adzuki_stew',
    'neapolitan:adzuki_curry'
  ]

  function fix_recipe(recipe) {
    let inputs = []
    let output = recipe.originalRecipeResult

    let liquid = false

    for(let i = 0; i < recipe.originalRecipeIngredients.length; i++) {
      let ingredient = recipe.originalRecipeIngredients[i];
      let ingredientName = Item.of(ingredient).id

      switch(ingredientName) {
        // Remove bowls entirely
        case 'minecraft:bowl':
          continue

        // Replace soymilk buckets with any milk-like thing.
        case 'vegandelight:soymilk_bucket':
          ingredient = {'fluidTag': 'forge:milk', 'amount': 250}
          liquid = true
          break

        // Replace bowls of tomato sauce with liquid
        case 'farmersdelight:tomato_sauce':
          ingredient = {'fluid': 'create_central_kitchen:tomato_sauce', 'amount': 250}
          liquid = true
          break

        case 'farmersdelight:onion':
          ingredient = 'some_assembly_required:sliced_onion'
          break;

        case 'farmersdelight:tomato':
          ingredient = 'some_assembly_required:tomato_slices'
          break;

        case 'minecraft:potato':
          ingredient = 'kubejs:cut_potato'
          break;

        case 'minecraft:carrot':
          ingredient = 'some_assembly_required:chopped_carrot'
          break;

        case 'minecraft:beetroot':
          ingredient = 'some_assembly_required:chopped_beetroot'
          break;

      }

      inputs.push(ingredient)
    }

    // Stews & soups should have a liquid of some sort.
    if(!liquid && (output.id.includes('stew') || output.id.includes('soup'))) {
      inputs.push({'fluid': 'minecraft:water', 'amount': 250})
    }

    // Remove the old shapeless recipe

    event.remove({'output': output.id, 'type': 'minecraft:crafting_shapeless'})

    let newRecipe = event.recipes.create.mixing(output, inputs)

    if(heatedRecipes.includes(output.id)) {
      newRecipe.heated()
    }

  }

  event.forEachRecipe({ 'mod': 'neapolitan', 'type': 'minecraft:crafting_shapeless' }, fix_recipe)

  /***
   * Cookies
   **/

  event.recipes.create.pressing('kubejs:chocolate_chips', ['create:bar_of_chocolate'])

  for(let i = 0; i < global.cookies.length; i++) {
    let output = global.cookies[i][0]
    let ingredients = global.cookies[i][1]

    let uncooked = 'kubejs:uncooked_' + output.split(':')[1]

    event.remove({'output': output})
    event.recipes.create.mixing(uncooked, ingredients)
    event.smelting(output, uncooked)
  }

  /***
   * Confectionery Recipes
   **/

  // We don't have access to dragon's breath, so come up with an alternative
  event.remove({'id': 'create_confectionery:ruby_chocolate_recipe'})

  event.recipes.create.haunting('create_confectionery:bar_of_ruby_chocolate', 'create_confectionery:bar_of_black_chocolate')
  event.recipes.create.haunting('create_confectionery:bar_of_ruby_chocolate', 'create_confectionery:bar_of_white_chocolate')

  // Chocolate sampler boxes

  for(let i = 0; i < global.chocolateSamplers.length; i++) {
    let sampler = global.chocolateSamplers[i];
    let incomplete = 'kubejs:incomplete_' + sampler.name
    let steps = []

    for(let j = 1; j < sampler.ingredients.length; j++) {
      steps.push(event.recipes.createDeploying(incomplete, [incomplete, sampler.ingredients[j]]))
    }
    // Finally, build the sequence.
    event.recipes.create.sequenced_assembly(
      'kubejs:' + sampler.name,
      sampler.ingredients[0], // The first ingredient in the list is the one we start with.
      steps
    ).transitionalItem(incomplete).loops(1)
  }

  /***
   * Fried Foods
   **/
  let friedFoods = [
    ['kubejs:sliced_potato', 'kubejs:fries'],
    ['kubejs:tortilla_pieces', 'culturaldelights:tortilla_chips'],
    ['kubejs:breaded_chicken_cuts', 'kubejs:fried_chicken'],
    ['kubejs:breaded_fish_slice', 'kubejs:fried_fish'],
    ['kubejs:breaded_onion', 'kubejs:blooming_onion']
  ]

  // Frying requires a lot of oil, but returns most of it!
  function fryingRecipe(event, input, output) {
    event.remove({'output': output})

    event.custom({
      'type': 'farmersdelight:cooking',
      'cookingtime': 200,
      'experience': 1,
      'ingredients': [{'item': input}, {'item': 'kubejs:oil_bottle'}],
      'result': {'item': output}
    })
  }

  for(let i = 0; i < friedFoods.length; i++) {
    fryingRecipe(event, friedFoods[i][0], friedFoods[i][1])
  }

  // Odds and ends
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [{'item': 'kubejs:sliced_potato'}, {'item': 'kubejs:chile_powder'}],
    'result': {'item': 'kubejs:seasoned_potatoes'}
  })

  event.shapeless('kubejs:breaded_chicken_cuts', ['#forge:cut_chicken', 'create:wheat_flour', 'kubejs:corn_starch', 'kubejs:chile_powder'])
  event.shapeless('kubejs:breaded_fish_slice', ['#forge:cod_slices', 'create:wheat_flour', 'kubejs:corn_starch'])
  event.shapeless('kubejs:breaded_onion', ['some_assembly_required:sliced_onion', 'create:wheat_flour', 'kubejs:corn_starch'])

  // event.recipes.create.mixing('kubejs:breaded_chicken_cuts', [{'item': 'forge:cut_chicken'}, {'item': 'create:wheat_flour'}, {'item': 'kubejs:corn_starch'}, {'item': 'kubejs:chile_powder'}])
  // event.recipes.create.mixing('kubejs:breaded_fish_slice', [{'item': 'forge:cod_slices'}, {'item': 'create:wheat_flour'}, {'item': 'kubejs:corn_starch'}])

  event.shapeless('kubejs:chicken_tenders_meal', ['kubejs:fried_chicken', 'kubejs:fries'])
  event.shapeless('kubejs:fish_and_chips', ['kubejs:fried_fish', 'kubejs:fries'])

  /***
   * Misc
   **/

  // Functional storage shortcut from chest to drawer as this conflicts with the generic chest recipe.
  event.remove({'id': 'functionalstorage:oak_drawer_alternate_x1'})
  event.remove({'id': 'functionalstorage:oak_drawer_alternate_x2'})
  event.remove({'id': 'functionalstorage:oak_drawer_alternate_x4'})

  // Remove compressed crate recipes
  const changeCrates = [
    ['collectorsreap:lime_crate', 'collectorsreap:lime'],
    ['collectorsreap:pomegranate_crate', 'collectorsreap:pomegranate'],
    ['culturaldelights:avocado_crate', 'culturaldelights:avocado'],
    ['culturaldelights:cucumber_crate', 'culturaldelights:cucumber'],
    ['culturaldelights:pickle_crate', 'culturaldelights:pickle'],
    ['culturaldelights:corn_cob_crate', 'culturaldelights:corn_cob'],
    ['culturaldelights:eggplant_crate', 'culturaldelights:eggplant'],
    ['culturaldelights:white_eggplant_crate', 'culturaldelights:white_eggplant'],
    ['farmersdelight:carrot_crate', 'minecraft:carrot'],
    ['farmersdelight:potato_crate', 'minecraft:potato'],
    ['farmersdelight:beetroot_crate', 'minecraft:beetroot'],
    ['farmersdelight:cabbage_crate', 'farmersdelight:cabbage'],
    ['farmersdelight:tomato_crate', 'farmersdelight:tomato'],
    ['farmersdelight:onion_crate', 'farmersdelight:onion'],
    ['neapolitan:banana_crate', 'neapolitan:banana'],
    ['neapolitan:adzuki_crate', 'neapolitan:adzuki_beans'],
    ['neapolitan:roasted_adzuki_crate', 'neapolitan:roasted_adzuki_beans'],
    ['quark:golden_apple_crate', 'minecraft:golden_apple'],
    ['quark:apple_crate', 'minecraft:apple'],
    ['quark:golden_carrot_crate', 'minecraft:golden_carrot'],
  ]

  for(let i = 0; i < changeCrates.length; i++) {
    let output = changeCrates[i][0]
    let input = changeCrates[i][1]
    let name = output.replace(':', '_') + '_manual_only'
    event.remove({'output': output})
    event.shapeless(output, ['9x ' + input]).id(name)
  }

  // Remove duplicate crates
  const removeCrates = [
    'quark:potato_crate',
    'quark:carrot_crate',
    'quark:beetroot_crate',
    'quarkdelight:ancient_fruit_crate',
  ]

  for(let i = 0; i < removeCrates.length; i++) {
    event.remove({'output': removeCrates[i]})
  }

  // event.remove({'id': 'quark:building/crafting/compressed/potato_crate'})
  // event.remove({'id': 'quark:building/crafting/compressed/potato_crate'})
  // event.remove({'id': 'quark:building/crafting/compressed/potato_crate'})
  // event.remove({'id': 'quark:building/crafting/compressed/potato_crate'})


  event.replaceInput({'output': 'create:large_water_wheel'}, 'minecraft:oak_planks', 'minecraft:iron_ingot')

  event.remove({'output': 'create:water_wheel'})
  event.shaped(
    Item.of('create:water_wheel'),
    [
      'ABA',
      'BCB',
      'ABA'
    ],
    {
      'A': 'create:andesite_alloy',
      'B': '#minecraft:planks',
      'C': 'create:large_cogwheel'
    }
  )


})