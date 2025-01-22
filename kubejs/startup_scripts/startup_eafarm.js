// priority: 100

// This file is for our basic ingredients.

Platform.mods.kubejs.name = "EA Farm"

/***
 * Helper Functions
 **/

function inspectVariable(item) {
  let methods = [];
  for (const m in item) {
    if (typeof item[m] == "function" ) {
      methods.push(m);
    }
  }
  console.log(methods.join(', '))
}

function createFluid(event, conf) {
  let fluid = event.create(conf.name)
    .bucketColor(conf.color)
    .displayName(conf.title)

  if(conf.texture == 'thin') {
    fluid.thinTexture(conf.color);
  }
  else if(conf.texture == 'thick') {
    fluid.thickTexture(conf.color);
  }
}

function createBottledFluid(event, conf) {
  let hunger = conf.hunger || 2;
  let saturation = conf.saturation || 1;

  let bottle = event.create(conf.name + '_bottle')
    .displayName(conf.title)
    .containerItem('minecraft:glass_bottle')
    .food(food => {
      food
        .hunger(hunger)
        .saturation(saturation)
        .eaten(ctx => {
          ctx.player.give(Item.of('minecraft:glass_bottle', 1))
        })

      if(conf.desc) {
        food.tooltip(conf.desc)
      }
    })
  if(conf.bottled) {
    bottle.texture(conf.bottled)
  }
}

function createFood(event, conf) {
  let hunger = conf.hunger || 2;
  let saturation = conf.saturation || 1;

  event.create(conf.name)
    .displayName(conf.title)
    .food(food => {
      food
        .hunger(hunger)
        .saturation(saturation)

      if(conf.desc) {
        food.tooltip(conf.desc)
      }
    })
}

function createFoodShort(event, name, title, desc, hunger, saturation) {
  hunger = hunger || 2;
  saturation = saturation || 1;

  let food =  event.create(name)
    .displayName(title)
    .food(food => {
      food.hunger(hunger).saturation(saturation)
    })

  if(desc) {
    food.tooltip(desc)
  }

  return food;
}


function getNameFromItem(id) {
  // This doesn't work in startup scripts
  // let item = Item.of(id);
  // let text = item.getDisplayName().getString()
  // return text.substring(1, text.length()-1)

  let itemName = id
  if(itemName.indexOf(':') !== -1) {
    itemName = itemName.split(':')[1]
  }
  return titleCase(itemName)
}

function createIncompleteItem(event, item, texture) {
  let name = 'Incomplete ' + getNameFromItem(item);

  if(!texture) {
    texture = 'kubejs:item/incomplete_meal'
  }

  let itemName = item
  if(itemName.indexOf(':') !== -1) {
    itemName = itemName.split(':')[1]
  }

  let id = 'incomplete_' + itemName
  event.create(id, 'create:sequenced_assembly')
    .displayName(name)
    .texture(texture)
}

function titleCase(str) {
  str = str.toLowerCase().split(/ |_/);
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

/***
 * Extra Foods
 **/

StartupEvents.registry('item', event => {
  // Inedible ingredients
  event.create('corn_flour').displayName('Corn Flour').texture('create:item/wheat_flour')
  event.create('corn_starch').displayName('Corn Starch').texture('create:item/wheat_flour')
  event.create('raw_tortilla').displayName('Raw Tortilla').tooltip('You need to cook this before you can eat it.')
  event.create('dough_sheet').displayName('Dough Sheet').tooltip('This can be used to make pasta.')

  event.create('cut_potato').displayName('Cut Potatoes').tooltip('Potatoes that have been cut once.')
  event.create('sliced_potato').displayName('Sliced Potatoes').tooltip('Potatoes that have been cut twice.')

  event.create('cheesecake').displayName('Plain Cheesecake')
  event.create('strawberry_cheesecake').displayName('Strawberry Cheesecake')
  event.create('blueberry_cheesecake').displayName('Blueberry Cheesecake')

  event.create('oil_bottle').displayName('Seed Oil Bottle').tooltip('You can use this for cooking.').texture('kubejs:item/yellow_bottle')

  event.create('uncooked_roast_chicken').displayName('Uncooked Roast Chicken').tooltip('You need to cook this before you can eat it.').texture('farmersdelight:item/roast_chicken')
  event.create('uncooked_dumplings').displayName('Uncooked Dumpling').tooltip('You need to cook this before you can eat it.').texture('farmersdelight:item/dumplings')

  event.create('breaded_fish_slice').displayName('Breaded Fish').tooltip('You need to fry this before you can eat it.')
  event.create('breaded_chicken_cuts').displayName('Breaded Chicken').tooltip('You need to fry this before you can eat it.')
  event.create('breaded_onion').displayName('Breaded Onion').tooltip('You need to fry this before you can eat it.')

  event.create('uncooked_black_bean_patty').displayName('Uncooked Black Bean Patty').tooltip('You need to cook this before you can eat it.')
  event.create('uncooked_burger_bun').displayName('Uncooked Burger Bun').tooltip('You need to cook this before you can use it.')
  event.create('guacamole').displayName('Guacamole')

  // New custom foods
  createFoodShort(event, 'berries_and_cream', 'Berries and Cream', 'Fluxo\'s favorite dish!')
  createFoodShort(event, 'sauerkraut', 'Sauerkraut', 'Fermented cabbage.')
  createFoodShort(event, 'natto', 'Natto', 'Fermented soybeans.')
  createFoodShort(event, 'sushi_rice', 'Sushi Rice', 'Rice mixed with vinegar for making sushi.').texture('farmersdelight:item/rice')
  createFoodShort(event, 'fries', 'Fries', 'Fried sliced potatoes.')
  createFoodShort(event, 'mashed_potatoes', 'Mashed Potatoes', '').containerItem('minecraft:bowl')
  createFoodShort(event, 'cooked_pasta', 'Cooked Pasta', '').texture('farmersdelight:item/raw_pasta')

  createFoodShort(event, 'green_apple_slices', 'Green Apples Slices', 'Slices of a green apple.')
  createFoodShort(event, 'cheesecake_slice', 'Plain Cheesecake Slice', 'Slice of a plain cheesecake.')
  createFoodShort(event, 'strawberry_cheesecake_slice', 'Strawberry Cheesecake Slice', 'Slice of a strawberry cheesecake.', 3)
  createFoodShort(event, 'blueberry_cheesecake_slice', 'Blueberry Cheesecake Slice', 'Slice of a blueberry cheesecake.', 3)
  createFoodShort(event, 'vanilla_cake_slice', 'Vanilla Cake Slice', 'Slice of a vanilla cake.', 3)
  createFoodShort(event, 'chocolate_chips', 'Chocolate Chips', 'Small pieces of chocolate')

  createFoodShort(event, 'bean_burrito', 'Bean Burrito', 'A burrito filled with beans', 5, 4).texture('culturaldelights:item/beef_burrito')
  createFoodShort(event, 'breakfast_burrito', 'Breakfast Burrito', 'A burrito filled with eggs, beans, and peppers', 7, 5).texture('culturaldelights:item/beef_burrito')
  createFoodShort(event, 'seasoned_potatoes', 'Seasoned Potatoes', '', 3)
  createFoodShort(event, 'tortilla_pieces', 'Tortilla Pieces', 'Cut up pieces of a tortilla. Fry these to make chips!').texture('culturaldelights:item/tortilla_chips')
  createFoodShort(event, 'chips_and_salsa', 'Chips and Salsa', '', 6, 4)
  createFoodShort(event, 'chips_and_guacamole', 'Chips and Guacamole', '', 6, 4)
  createFoodShort(event, 'nachos', 'Nachos', '', 8, 6)

  createFoodShort(event, 'fried_chicken', 'Fried Chicken', 'Chicken that has been breaded and fried.', 6, 4)
  createFoodShort(event, 'fried_fish', 'Fried Fish', 'Fish that has been breaded and fried.', 6, 4)

  createFoodShort(event, 'chicken_tenders_meal', 'Chicken Tenders Meal', 'Chicken tendies and fries.', 8, 6)
  createFoodShort(event, 'fish_and_chips', 'Fish and Chips', 'Fried fish and fries.', 8, 6)
  createFoodShort(event, 'blooming_onion', 'Blooming Onion').texture('biomeswevegone:item/blooming_oddion')

  createFoodShort(event, 'black_bean_patty', 'Black Bean Patty', '', 6, 4).texture('farmersdelight:item/beef_patty')
  createFoodShort(event, 'black_bean_burger', 'Black Bean Burger', '', 8, 6).texture('farmersdelight:item/hamburger')
  createFoodShort(event, 'black_bean_soup', 'Black Bean Soup', '', 6, 4)

  createFoodShort(event, 'pink_pony_club', 'Pink Pony Club Sandwich', 'A delicious, multi-tiered vegan sandwich.', 12, 8).texture('farmersdelight:item/bacon_sandwich')

  createIncompleteItem(event, 'neapolitan:neapolitan_ice_cream', 'neapolitan:item/vanilla_ice_cream')
})

/***
 * Juices & Jams
 **/

// These get initialized in startup_last.js

global.foodFluids = [
  {'name': 'rice_vinegar', 'title': 'Rice Vinegar', 'ingredients': [], 'color': 0xffffee, 'texture': 'thin'},
  {'name': 'apple_cider_vinegar', 'title': 'Apple Cider Vinegar', 'ingredients': [], 'color': 0xffffcc, 'texture': 'thin'},
  {'name': 'soy_sauce', 'title': 'Soy Sauce', 'ingredients': [], 'color': 0x090900, 'texture': 'thin'},
  {'name': 'mayonnaise', 'title': 'Mayonnaise', 'ingredients': [], 'ingredients': ['#forge:eggs', {'fluidTag': 'forge:vinegar', 'amount': 100}, {'fluid': 'createaddition:seed_oil', 'amount': 100}], 'color': 0xfffff0, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/white_jar'},
  {'name': 'spicy_mayo', 'title': 'Spicy Mayo', 'ingredients': [], 'ingredients': [{'fluidTag': 'kubejs:mayonnaise', 'amount': 100}, {'fluid': 'kubejs:chile_paste', 'amount': 100}], 'color': 0xffd0d8, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/pink_jar'},
  {'name': 'kombucha', 'title': 'Kombucha', 'color': 0x973716, 'texture': 'thin', 'bottled': 'kubejs:item/brown_bottle'},

  {'name': 'lime_juice', 'title': 'Lime Juice', 'ingredients': ['2x collectorsreap:lime'], 'color': 0x5eff07, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/green_bottle'},
  {'name': 'apple_juice', 'title': 'Apple Juice', 'ingredients': ['2x #forge:apples'], 'color': 0x999907, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/yellow_bottle'},
  {'name': 'sweet_berry_juice', 'title': 'Sweet Berry Juice', 'ingredients': ['4x minecraft:sweet_berries'], 'color': 0xff0000, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/red_bottle'},
  {'name': 'strawberry_juice', 'title': 'Strawberry Juice', 'ingredients': ['4x neapolitan:strawberries'], 'color': 0xff0000, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/red_bottle'},
  {'name': 'blueberry_juice', 'title': 'Blueberry Juice', 'ingredients': ['4x biomeswevegone:blueberries'], 'color': 0x0000ff, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/blue_bottle'},
  {'name': 'pumpkin_juice', 'title': 'Pumpkin Juice', 'ingredients': ['2x farmersdelight:pumpkin_slice'], 'color': 0xff9900, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/orange_bottle'},
  {'name': 'tomato_juice', 'title': 'Tomato Juice', 'ingredients': ['2x farmersdelight:tomato'], 'color': 0xff0000, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/red_bottle'},
  {'name': 'pomegranate_juice', 'title': 'Pomegranate Juice', 'ingredients': ['8x collectorsreap:pomegranate_seeds'], 'color': 0xff0000, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/red_bottle'},
  {'name': 'beet_juice', 'title': 'Beet Juice', 'ingredients': ['4x minecraft:beetroot'], 'color': 0xff0000, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/red_bottle'},
  {'name': 'carrot_juice', 'title': 'Carrot Juice', 'ingredients': ['4x minecraft:carrot'], 'color': 0xff9900, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/orange_bottle'},

  {'name': 'sweet_cream', 'title': 'Sweet Cream', 'ingredients': ['minecraft:sugar', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xffffff, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/white_jar'},
  {'name': 'strawberry_jam', 'title': 'Strawberry Jam', 'ingredients': ['4x neapolitan:strawberries', 'minecraft:sugar', {'fluid': 'minecraft:water', 'amount': 250}], 'color': 0xff0000, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/red_jar'},
  {'name': 'sweet_berry_jam', 'title': 'Sweet Berry Jam', 'ingredients': ['4x minecraft:sweet_berries', 'minecraft:sugar', {'fluid': 'minecraft:water', 'amount': 250}], 'color': 0xff0000, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/red_jar'},
  {'name': 'blueberry_jam', 'title': 'Blueberry Jam', 'ingredients': ['4x biomeswevegone:blueberries', 'minecraft:sugar', {'fluid': 'minecraft:water', 'amount': 250}], 'color': 0x0748ff, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/blue_jar'},

  {'name': 'pumpkin_pie_filling', 'title': 'Pumpkin Pie Filling', 'ingredients': ['2x farmersdelight:pumpkin_slice', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0xdf6100, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/orange_jar'},
  {'name': 'rose_hip_pie_filling', 'title': 'Rose Hip Pie Filling', 'ingredients': ['4x farmersrespite:rose_hips', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0xff0000, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/pink_jar'},
  {'name': 'apple_pie_filling', 'title': 'Apple Pie Filling', 'ingredients': ['4x some_assembly_required:apple_slices', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0xff0000, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/red_jar'},
  {'name': 'lime_pie_filling', 'title': 'Key Lime Pie Filling', 'ingredients': ['8x collectorsreap:lime_slice', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0xc2df00, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/green_jar'},
  {'name': 'green_apple_pie_filling', 'title': 'Green Apple Pie Filling', 'ingredients': ['4x kubejs:green_apple_slices', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0x54f300, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/green_jar'},
  {'name': 'blueberry_pie_filling', 'title': 'Blueberry Pie Filling', 'ingredients': ['8x biomeswevegone:blueberries', 'minecraft:sugar', 'kubejs:corn_starch'], 'color': 0x0748ff, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/blue_jar'},
  {'name': 'cheesecake_mix', 'title': 'Cheesecake Mix', 'ingredients': ['minecraft:sugar', '#forge:eggs', {'fluid': 'kubejs:sweet_cream', 'amount': 250}], 'color': 0xfffff0, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/white_jar'},

  {'name': 'portobello_quiche_filling', 'title': 'Portobello Quiche Filling', 'ingredients': ['2x collectorsreap:portobello', '2x some_assembly_required:sliced_onion', '#forge:eggs'], 'color': 0xffffc0, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/white_jar'},
  {'name': 'shepherds_pie_filling', 'title': 'Shepherd\'s Pie Filling', 'ingredients': [{'fluid': 'kubejs:mashed_potatoes', 'amount': 125}, '2x some_assembly_required:sliced_onion', '2x some_assembly_required:chopped_carrot', '#forge:cooked_mutton'], 'color': 0xffffc0, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/brown_jar'},
  {'name': 'dumpling_filling', 'title': 'Dumpling Filling', 'ingredients': ['#forge:raw_beef', 'some_assembly_required:sliced_onion', 'farmersdelight:cabbage_leaf', {'fluid': 'kubejs:soy_sauce', 'amount': 250}], 'color': 0xffffc0, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/white_jar'},
  {'name': 'mashed_potatoes', 'title': 'Mashed Potatoes', 'ingredients': ['minecraft:potato'], 'color': 0xffffee, 'texture': 'thick', 'method': 'crushing', 'heated': true, 'bottled': 'kubejs:item/white_jar'},

  {'name': 'vanilla_ice_cream', 'title': 'Vanilla Ice Cream Mix', 'ingredients': ['minecraft:sugar', 'neapolitan:dried_vanilla_pods', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xffffd0, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/white_jar'},
  {'name': 'chocolate_ice_cream', 'title': 'Chocolate Ice Cream Mix', 'ingredients': ['minecraft:sugar', {'fluid': 'create:chocolate', 'amount': 125}, {'fluidTag': 'forge:milk', 'amount': 125}], 'color': 0x996633, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/brown_jar'},
  {'name': 'strawberry_ice_cream', 'title': 'Strawberry Ice Cream Mix', 'ingredients': ['minecraft:sugar', 'neapolitan:strawberries', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xff9999, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/red_jar'},
  {'name': 'banana_ice_cream', 'title': 'Banana Ice Cream Mix', 'ingredients': ['minecraft:sugar', 'neapolitan:banana', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xffff99, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/yellow_jar'},
  {'name': 'mint_ice_cream', 'title': 'Mint Ice Cream Mix', 'ingredients': ['minecraft:sugar', 'neapolitan:mint_leaves', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0x99ff99, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/green_jar'},
  {'name': 'adzuki_ice_cream', 'title': 'Adzuki Ice Cream Mix', 'ingredients': ['minecraft:sugar', 'neapolitan:roasted_adzuki_beans', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xff6666, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/red_jar'},
  {'name': 'lime_ice_cream', 'title': 'Lime Ice Cream Mix', 'ingredients': ['minecraft:sugar', {'fluid': 'kubejs:lime_juice', 'amount': 125}, {'fluidTag': 'forge:milk', 'amount': 125}], 'color': 0x99ff99, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/green_jar'},
  {'name': 'pomegranate_ice_cream', 'title': 'Pomegranate Ice Cream Mix', 'ingredients': ['4x collectorsreap:pomegranate_seeds', 'neapolitan:roasted_adzuki_beans', {'fluidTag': 'forge:milk', 'amount': 250}], 'color': 0xff6666, 'texture': 'thick', 'method': 'mixing', 'bottled': 'kubejs:item/red_jar'},

  {'name': 'strawberry_banana_smoothie', 'title': 'Strawberry Banana Smoothie', 'ingredients': ['2x neapolitan:strawberries', 'neapolitan:banana'], 'color': 0xff9999, 'texture': 'thick', 'method': 'mixing', 'bottle': 'neapolitan:strawberry_banana_smoothie'},
  {'name': 'pomegranate_smoothie', 'title': 'Pomegranate Smoothie', 'ingredients': ['4x collectorsreap:pomegranate_seeds', 'neapolitan:banana'], 'color': 0xff9999, 'texture': 'thick', 'method': 'mixing', 'bottle': 'collectorsreap:pomegranate_smoothie'},
]

global.chocolateSamplers = [
  {'name': 'chocolate_sampler_1', 'title': 'Mini Chocolate Sampler 1', 'ingredients': ['minecraft:paper', 'create_confectionery:bar_of_black_chocolate', 'create_confectionery:ruby_chocolate_candy', 'create_confectionery:black_chocolate_candy_1', 'create_confectionery:white_chocolate_candy_2', 'create_confectionery:chocolate_candy_3', 'create_confectionery:ruby_chocolate_glazed_marshmallow', 'neapolitan:chocolate_strawberries']},
  {'name': 'chocolate_sampler_2', 'title': 'Mini Chocolate Sampler 2', 'ingredients': ['minecraft:paper', 'create_confectionery:bar_of_white_chocolate', 'create_confectionery:chocolate_candy', 'create_confectionery:white_chocolate_candy_1', 'create_confectionery:ruby_chocolate_candy_2', 'create_confectionery:black_chocolate_candy_3', 'create_confectionery:chocolate_glazed_marshmallow', 'neapolitan:vanilla_chocolate_fingers']},
  {'name': 'chocolate_sampler_3', 'title': 'Mini Chocolate Sampler 3', 'ingredients': ['minecraft:paper', 'create_confectionery:bar_of_ruby_chocolate',  'create_confectionery:black_chocolate_candy', 'create_confectionery:ruby_chocolate_candy_1', 'create_confectionery:chocolate_candy_2', 'create_confectionery:white_chocolate_candy_3', 'create_confectionery:black_chocolate_glazed_marshmallow', 'neapolitan:mint_chocolate']},
  {'name': 'chocolate_sampler_4', 'title': 'Mini Chocolate Sampler 4', 'ingredients': ['minecraft:paper', 'create:bar_of_chocolate',                     'create_confectionery:white_chocolate_candy', 'create_confectionery:chocolate_candy_1', 'create_confectionery:black_chocolate_candy_2', 'create_confectionery:ruby_chocolate_candy_3', 'create_confectionery:white_chocolate_glazed_marshmallow', 'create:chocolate_glazed_berries']},
  {'name': 'large_chocolate_sampler', 'title': 'Large Chocolate Sampler', 'ingredients': ['minecraft:paper', 'kubejs:chocolate_sampler_1', 'kubejs:chocolate_sampler_2', 'kubejs:chocolate_sampler_3', 'kubejs:chocolate_sampler_4']},
]

StartupEvents.registry('item', event => {
  for(let i = 0; i < global.chocolateSamplers.length; i++) {
    let sampler = global.chocolateSamplers[i];
    createFoodShort(event, sampler.name, sampler.title, '')
    createIncompleteItem(event, 'kubejs:' + sampler.name, 'kubejs:item/incomplete_sampler')
  }
})
