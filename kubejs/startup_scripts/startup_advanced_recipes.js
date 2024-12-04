// priority: 20

// This file is for items that use the ingredients in the previous startup files.

/***
 * Replacement recipes
 **/

global.betterRecipes = [
  // [id, [ingredients array], incomplete item, is a sandwich?]
  //       --> bun/bowl, ...various ingredients, sauce

  // Burgers & Sandwiches
  ['farmersdelight:hamburger', ['some_assembly_required:burger_bun', '#forge:cooked_beef', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion', 'kubejs:mayonnaise_bottle'], 'create_central_kitchen:incomplete_hamburger', true],
  ['collectorsreap:portobello_burger', ['some_assembly_required:burger_bun', 'collectorsreap:baked_portobello_cap', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion', 'kubejs:mayonnaise_bottle'], false, true],
  ['culturaldelights:eggplant_burger', ['some_assembly_required:burger_bun', 'culturaldelights:cut_eggplant', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion', 'kubejs:mayonnaise_bottle'], false, true],
  ['farmersdelight:bacon_sandwich', ['some_assembly_required:toasted_bread_slice', '#forge:cooked_bacon', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'kubejs:mayonnaise_bottle'], 'create_central_kitchen:incomplete_bacon_sandwich', true],
  ['farmersdelight:chicken_sandwich', ['some_assembly_required:burger_bun', '#forge:cooked_chicken', 'culturaldelights:cut_pickle', 'kubejs:spicy_mayo_bottle'], 'create_central_kitchen:incomplete_chicken_sandwich', true],
  ['farmersdelight:egg_sandwich', ['some_assembly_required:burger_bun', '#forge:eggs', 'kubejs:chile_paste_bottle'], 'create_central_kitchen:incomplete_egg_sandwich', true],
  ['culturaldelights:mutton_sandwich', ['some_assembly_required:toasted_bread_slice', '#forge:cooked_mutton', '#forge:eggs', 'some_assembly_required:chopped_beetroot', 'kubejs:spicy_mayo_bottle'], false, true],

  // Big Meals
  ['farmersdelight:steak_and_potatoes', ['minecraft:bowl', '#forge:cooked_beef', 'minecraft:baked_potato', 'some_assembly_required:sliced_onion']],
  ['farmersdelight:roasted_mutton_chops', ['minecraft:bowl', '#forge:cooked_mutton', 'minecraft:baked_potato', 'some_assembly_required:chopped_carrot']],
  ['farmersdelight:grilled_salmon', ['minecraft:bowl', '#forge:cooked_fishes/salmon', 'minecraft:sweet_berries', 'farmersdelight:cabbage_leaf', 'some_assembly_required:sliced_onion']],
  ['farmersdelight:barbecue_stick', ['minecraft:bowl', 'minecraft:stick', '#forge:cooked_chicken', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion']],
  ['culturaldelights:avocado_toast', ['some_assembly_required:toasted_bread_slice', 'culturaldelights:cut_avocado'], 'create_central_kitchen:incomplete_chicken_sandwich'],

  // Tacos & Wraps
  ['culturaldelights:chicken_taco', ['culturaldelights:tortilla', '#forge:cooked_chicken', 'kubejs:chile_powder', 'farmersdelight:cabbage_leaf', 'some_assembly_required:sliced_onion', 'kubejs:salsa']],
  ['culturaldelights:fish_taco', ['culturaldelights:tortilla', '#forge:cooked_fishes', 'kubejs:chile_powder', 'culturaldelights:cut_avocado', 'some_assembly_required:sliced_onion', 'kubejs:salsa' ]],
  ['culturaldelights:beef_burrito', ['culturaldelights:tortilla', '#forge:cooked_beef', 'kubejs:chile_powder', 'culturaldelights:cut_avocado', 'some_assembly_required:sliced_onion', 'kubejs:salsa']],
  ['farmersdelight:mutton_wrap', ['culturaldelights:tortilla', '#forge:cooked_mutton', 'farmersdelight:cabbage_leaf', 'some_assembly_required:sliced_onion', 'kubejs:spicy_mayo_bottle'], 'create_central_kitchen:incomplete_mutton_wrap'],
  ['collectorsreap:portobello_wrap', ['culturaldelights:tortilla', 'collectorsreap:baked_portobello_cap', 'farmersdelight:cabbage_leaf', 'some_assembly_required:sliced_onion', 'culturaldelights:cut_avocado', 'kubejs:spicy_mayo_bottle']],
  ['kubejs:bean_burrito', ['culturaldelights:tortilla', 'kubejs:black_beans_seed', 'kubejs:chile_powder', 'some_assembly_required:sliced_onion', 'kubejs:salsa']],
  ['kubejs:breakfast_burrito', ['culturaldelights:tortilla', 'kubejs:black_beans_seed', '#forge:eggs', 'kubejs:chile_powder', 'kubejs:cut_green_pepper', 'kubejs:seasoned_potatoes', 'kubejs:salsa']],

  // Salads
  ['farmersdelight:mixed_salad', ['minecraft:bowl', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'some_assembly_required:sliced_onion', '#forge:vinegar_bottle']],
  ['collectorsreap:deluxe_salad', ['minecraft:bowl', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'culturaldelights:cut_avocado', 'collectorsreap:pomegranate_seeds', '#forge:apple_slices', '#forge:vinegar_bottle']],
  ['culturaldelights:hearty_salad', ['minecraft:bowl', 'farmersdelight:cabbage_leaf', 'some_assembly_required:tomato_slices', 'culturaldelights:cut_avocado', 'culturaldelights:cut_cucumber', '#forge:vinegar_bottle']],

  // Sushi
  ['vegandelight:tofish_roll', ['kubejs:sushi_rice', 'vegandelight:tofish', 'minecraft:dried_kelp']],
  ['vegandelight:smoked_tofish_roll', ['kubejs:sushi_rice', 'vegandelight:smoked_tofish', 'minecraft:dried_kelp']],
  ['farmersdelight:salmon_roll', ['kubejs:sushi_rice', 'farmersdelight:salmon_slice', 'minecraft:dried_kelp']],
  ['farmersdelight:cod_roll', ['kubejs:sushi_rice', 'farmersdelight:cod_slice', 'minecraft:dried_kelp']],
  ['farmersdelight:kelp_roll', ['minecraft:dried_kelp', 'kubejs:sushi_rice', 'some_assembly_required:chopped_carrot']],
  ['culturaldelights:midori_roll', ['minecraft:dried_kelp', 'kubejs:sushi_rice', 'culturaldelights:cut_cucumber', 'culturaldelights:cut_avocado']],
  ['culturaldelights:chicken_roll', ['minecraft:dried_kelp', 'kubejs:sushi_rice', '#forge:cooked_chicken']],
]

StartupEvents.registry('item', event => {
  for(let i = 0; i < global.betterRecipes.length; i++) {
    let item = global.betterRecipes[i]

    if(!item[2]) {
      createIncompleteItem(event, item[0])
    }
  }
})


/***
 * Neapolitan Recipe Fix Helpers
 **/
StartupEvents.registry('item', event => {
  createIncompleteItem(event, 'neapolitan:neapolitan_ice_cream', 'neapolitan:item/vanilla_ice_cream')
})


/***
 * Cake Recipes
 **/

global.frostings = [
  {'name': 'vanilla', 'title': 'Vanilla Frosting', 'ingredient': 'neapolitan:dried_vanilla_pods', 'color': 0xffffff},
  {'name': 'banana', 'title': 'Banana Frosting', 'ingredient': 'neapolitan:banana', 'color': 0xfbd40e},
  {'name': 'strawberry', 'title': 'Strawberry Frosting', 'ingredient': 'neapolitan:strawberries', 'color': 0xff9898},
  {'name': 'mint', 'title': 'Mint Frosting', 'ingredient': 'neapolitan:mint_leaves', 'color': 0x98ff98},
  {'name': 'adzuki', 'title': 'Adzuki Frosting', 'ingredient': 'neapolitan:adzuki_beans', 'color': 0xca1a67},
  {'name': 'coffee', 'title': 'Coffee Frosting', 'ingredient': 'farmersrespite:coffee_beans', 'color': 0x6d4300},
  {'name': 'lime', 'title': 'Lime Frosting', 'ingredient': 'collectorsreap:lime', 'color': 0x53ff43},
  {'name': 'pomegranate', 'title': 'Pomegranate Frosting', 'ingredient': 'collectorsreap:pomegranate_seeds', 'color': 0xff4374},
]

StartupEvents.registry('fluid', event => {
  event.create('frosting')
    .thickTexture(0xffffff)
    .bucketColor(0xffffff)
    .displayName('Frosting')

  for(let i = 0; i < global.frostings.length; i++) {
    let frosting = global.frostings[i];

    event.create(frosting.name + '_frosting')
      .thickTexture(frosting.color)
      .bucketColor(frosting.color)
      .displayName(frosting.title)
  }
})

/***
 * Pie Recipes
 **/

global.pies = [
  {'name': 'minecraft:pumpkin_pie', 'title': 'Pumpkin Pie', 'filling': 'kubejs:pumpkin_pie_filling'},
  {'name': 'farmersrespite:rose_hip_pie', 'title': 'Rose Hip Pie', 'filling': 'kubejs:rose_hip_pie_filling'},
  {'name': 'farmersdelight:apple_pie', 'title': 'Apple Pie', 'filling': 'kubejs:apple_pie_filling'},
  {'name': 'farmersdelight:chocolate_pie', 'title': 'Chocolate Pie', 'filling': 'create:chocolate'},
  {'name': 'collectorsreap:lime_pie', 'title': 'Key Lime Pie', 'filling': 'kubejs:lime_pie_filling'},
  {'name': 'biomeswevegone:green_apple_pie', 'title': 'Green Apple Pie', 'filling': 'kubejs:green_apple_pie_filling'},
  {'name': 'biomeswevegone:blueberry_pie', 'title': 'Blueberry Pie', 'filling': 'kubejs:blueberry_jam'},
  {'name': 'kubejs:cheesecake', 'title': 'Cheesecake', 'filling': 'kubejs:cheesecake_mix'},
  {'name': 'collectorsreap:portobello_quiche', 'title': 'Portobello Quiche', 'filling': 'kubejs:portobello_quiche_filling'},
  {'name': 'farmersdelight:shepherds_pie', 'title': 'Shepherd\'s Pie', 'filling': 'kubejs:shepherds_pie_filling'}
]

// Create a raw version of each pie
StartupEvents.registry('item', event => {
  for(let i = 0; i < global.pies.length; i++) {
    let pie = global.pies[i];
    let uncooked = 'uncooked_' + pie.name.split(':')[1];

    event.create(uncooked)
      .displayName('Uncooked ' + pie.title)
      .tooltip("This needs to be cooked before you can eat it.")
      .texture(pie.name.replace(':', ':item/'))
  }
})

/***
 * Cookie Recipes
 **/

global.cookies = [
  ['minecraft:cookie', ['create:wheat_flour', '#forge:eggs', 'minecraft:sugar', 'kubejs:chocolate_chips'], 'Cookie'],
  ['farmersrespite:green_tea_cookie', ['create:wheat_flour', '#forge:eggs', 'minecraft:sugar', 'farmersrespite:green_tea_leaves'], 'Green Tea Cookie'],
  ['farmersdelight:sweet_berry_cookie', ['create:wheat_flour', '#forge:eggs', 'minecraft:sugar', 'minecraft:sweet_berries'], 'Sweet Berry Cookie'],
  ['farmersdelight:honey_cookie', ['create:wheat_flour', '#forge:eggs', {'fluidTag': 'forge:honey', 'amount': 100}], 'Honey Cookie'],
  ['collectorsreap:lime_cookie', ['create:wheat_flour', '#forge:eggs', 'minecraft:sugar', {'fluid': 'kubejs:lime_juice', 'amount': 100}], 'Lime Cookie']
]

StartupEvents.registry('item', event => {
  for(let i = 0; i < global.cookies.length; i++) {
    let cookie = global.cookies[i][0]
    let name = 'Uncooked ' + global.cookies[i][2]
    let shortName = 'uncooked_' + cookie.split(':')[1]

    event.create(shortName)
      .displayName(name)
      .tooltip("This needs to be cooked before you can eat it.")
      .texture(cookie.replace(':', ':item/'))
  }

})