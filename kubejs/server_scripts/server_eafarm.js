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
         + French Fries
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

  event.add('forge:cooked_bacon', 'vegandelight:cooked_smoked_tofu_slices')

  event.add('forge:vinegar_bottle', 'kubejs:rice_vinegar_bottle')
  event.add('forge:vinegar_bottle', 'kubejs:apple_cider_vinegar_bottle')

  event.add('forge:cut_vegetables', 'some_assembly_required:chopped_beetroot')
  event.add('forge:cut_vegetables', 'some_assembly_required:chopped_carrot')
  event.add('forge:cut_vegetables', 'some_assembly_required:sliced_onion')
  event.add('forge:cut_vegetables', 'some_assembly_required:tomato_slices')
})

ServerEvents.tags('fluid', event => {
  event.add('forge:vinegar', 'kubejs:rice_vinegar')
  event.add('forge:vinegar', 'kubejs:apple_cider_vinegar')
})

ServerEvents.recipes(event => {

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
  let coin_economy = [
    'zinc_coin',
    'copper_coin',
    'iron_coin',
    'brass_coin',
    'industrial_iron_coin',
    'gold_coin',
    'netherite_coin'
  ]

  // 8 x smaller coin -> 1 smaller coin stack; 8 x smaller coin stack -> 1 bigger coin
  // The 64 x smaller coin -> 1 bigger coin recipe only appears to work in the mixer for some reason.
  // Must be a shortcoming in Minecraft itself? Is there a mod to fix this, to use stacks as inputs?
  for(let i = 0; i < coin_economy.length - 1; i++) {
    let smaller = coin_economy[i]
    let bigger = coin_economy[i + 1]
    event.shapeless('64x createdeco:' + smaller, ['createdeco:' + bigger])
    event.shapeless('createdeco:' + bigger, [Item.of('createdeco:' + smaller, 64)])
    event.shapeless('createdeco:' + smaller + 'stack', [Item.of('createdeco:' + smaller, 8)])
    event.shapeless('8x createdeco:' + smaller, [Item.of('createdeco:' + smaller + 'stack', 1)])
    event.shapeless('createdeco:' + bigger, [Item.of('createdeco:' + smaller + 'stack', 8)])
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

  event.remove({'output': 'farmersdelight:raw_pasta', 'input': 'minecraft:wheat'})

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


  event.replaceInput(
    { input: 'minecraft:wheat', output: 'quarkdelight:bucket_of_sweet_gelatine' },
    'minecraft:wheat',
    'create:wheat_flour'
  )

  // Replace some recipes to make more sense.
  event.remove({
    'input': 'minecraft:wheat',
    'output': 'some_assembly_required:burger_bun'
  })
  event.shapeless('some_assembly_required:burger_bun', ['#forge:dough', '#forge:seeds'])

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

  // Fix Biomass
  event.remove({'output': 'createaddition:biomass'})

  // Add a better rice recipe
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

      inputs.push({'item': ingredientName});
    }

    inputs.push({'item': 'minecraft:slime_ball'})

    event.remove({ 'output': output.id })
    event.custom({
      'type': 'farmersdelight:cooking',
      'cookingtime': 200,
      'experience': 1,
      'ingredients': inputs,
      'result': {item: output.id, count: 1}
    })

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

        // Replace bowls of tomato sauce with liquid
        case 'farmersdelight:tomato_sauce':
          ingredient = {'fluid': 'create_central_kitchen:tomato_sauce', 'amount': 250}
          liquid = true
          break
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
    event.remove({'output': id})
    event.shapeless(id, ingredients)

    // Most sandwiches and things need a piece of bread/etc. on top and bottom.
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
    'result': {item: 'farmersdelight:dumplings'}
  })

  /***
   * Salt
   ***/

  // The recipe for salt as water in a heated mixer is prone to conflicts, so we need another way to make salt.
  // Removing salt recipes until I think of a better way which has less conflicts.
  // Custom machine?  Dehydrator maybe?

  // Replace all recipes using salt.
  event.remove({ 'mod': 'vegandelight', 'output': 'vegandelight:salt' })

  event.remove({ 'input': 'vegandelight:salt' })
  event.recipes.create.compacting('vegandelight:tofu', [{'fluid': 'vegandelight:soymilk', 'amount': 1000}]).heated()

  event.remove({ 'mod': 'vegandelight', 'output': 'vegandelight:silken_tofu' })
  event.custom({
    'type': 'create:mixing',
    'heatRequirement': 'heated',
    'ingredients': [{
      'amount': 1000,
      'fluid': 'minecraft:water'
    },{
      'amount': 1000,
      'fluid': 'vegandelight:soymilk'
    }],
    'results': [
        {'item': 'vegandelight:silken_tofu'}
    ]
  })

  /***
   * Extra Foods
   **/

  event.recipes.create.milling('kubejs:corn_flour', 'culturaldelights:corn_kernels')
  event.recipes.create.milling('kubejs:corn_starch', 'kubejs:corn_flour')

  event.recipes.create.mixing({fluid: 'kubejs:sweet_cream', amount:1000}, [
    {fluidTag: 'forge:milk', amount:1000},
    'minecraft:sugar'
  ]).heated()

  event.shapeless('kubejs:berries_and_cream', ['#forge:milk', 'minecraft:sugar', '#forge:berries'])
  event.recipes.create.mixing('kubejs:berries_and_cream', [
    {fluid: 'kubejs:sweet_cream', amount:1000},
    '#forge:berries'
  ])


  for(let i = 0; i < global.foodFluids.length; i++) {
    let fluid = global.foodFluids[i]

    if(fluid.method == 'mixing') {
      let mix = event.recipes.create.mixing({'fluid': 'kubejs:' + fluid.name, 'amount': 250}, fluid.ingredients)
      if(fluid.heated) {
        mix.heated()
      }
    }
    else if(fluid.method == 'crushing') {
      event.recipes.create.compacting({'fluid': 'kubejs:' + fluid.name, 'amount': 250}, fluid.ingredients)
    }

    // Bottled version
    event.recipes.create.filling('kubejs:' + fluid.name + '_bottle', [Fluid.of('kubejs:' + fluid.name, 250), 'minecraft:glass_bottle'])
  }

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
    ['biomeswevegone:green_apple', 'kubejs:green_apple_slices', 4],
    ['farmersdelight:onion', 'some_assembly_required:sliced_onion', 4],
    ['minecraft:beetroot', 'some_assembly_required:chopped_beetroot', 4],
    ['minecraft:carrot', 'some_assembly_required:chopped_carrot', 8],
    ['minecraft:golden_carrot', 'some_assembly_required:chopped_golden_carrot', 8],
    ['farmersdelight:tomato', 'some_assembly_required:tomato_slices', 4],
    ['culturaldelights:cucumber', 'culturaldelights:cut_cucumber', 8],
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

  // Some of these recipes are just silly. Fix them.

  'neapolitan:strawberry_bean_bonbons'
  'neapolitan:vanilla_pudding'
  'neapolitan:banana_bread'
  'neapolitan:adzuki_bun'
  'neapolitan:vanilla_fudge'
  'neapolitan:strawberry_scones'
  'neapolitan:milk_bottle'

  event.remove({'output': 'neapolitan:neapolitan_ice_cream', 'type': 'minecraft:crafting_shapeless'})
  event.recipes.create.sequenced_assembly(
    ['neapolitan:neapolitan_ice_cream'],
    ['neapolitan:vanilla_ice_cream'],
    [
      event.recipes.createDeploying('kubejs:incomplete_neapolitan_ice_cream', ['kubejs:incomplete_neapolitan_ice_cream', 'neapolitan:chocolate_ice_cream']),
      event.recipes.createDeploying('kubejs:incomplete_neapolitan_ice_cream', ['kubejs:incomplete_neapolitan_ice_cream', 'neapolitan:strawberry_ice_cream']),
    ]
  ).transitionalItem('kubejs:incomplete_neapolitan_ice_cream').loops(1)

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
   * Fried Foods
   **/
  let friedFoods = [
    ['kubejs:sliced_potato', 'kubejs:fries'],
    ['kubejs:tortilla_pieces', 'culturaldelights:tortilla_chips'],
  //  ['kubejs:fried_chicken'],
  ]

  // Frying requires a lot of oil, but returns most of it!
  function fryingRecipe(event, input, output) {
    event.remove({'output': output})
    event.recipes.create.mixing([
      input,
      { 'fluid': 'createadditions:seed_oil', 'amount': 1000 }
    ], [
      output,
      { 'fluid': 'createadditions:seed_oil', 'amount': 990 }
    ]).heated()

  }

  // Odds and ends
  event.custom({
    'type': 'farmersdelight:cooking',
    'cookingtime': 200,
    'experience': 1,
    'ingredients': [{'item': 'kubejs:sliced_potato'}, {'item': 'kubejs:chile_powder'}],
    'result': {item: 'kubejs:seasoned_potatoes', count: 1}
  })

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

  event.recipes.custommachinery.custom_machine('custommachinery:ice_machine', global.standard_freezing_time)
    .requireFluid(Fluid.of('minecraft:water', 1000))
    .produceItem(Item.of('minecraft:ice'))

})