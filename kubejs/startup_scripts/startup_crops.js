// priority: 80

/***
 * New Custom Crops
 *
 * Things that aren't in any of the other mods, but should be.
 **/

const FARMLAND = Java.loadClass('net.minecraft.world.level.block.FarmBlock')
const GRASS = Java.loadClass('net.minecraft.world.level.block.GrassBlock')

// [id, display name, amount to drop, has a seed]
global.custom_crops = [
  // Crops that use their food item as seed, like beans.
  ['black_beans', 'Black beans', [2,4], false],

  // Crops that use a separate seed.
  ['green_pepper', 'Green Pepper', [2,4], true],
  ['chile_pepper', 'Chile Pepper', [2,4], true],
  ['orange', 'Orange', [2,4], true, 'Cultivated Orange Tree'],
  ['grape', 'Grape', [2,4], true, 'Grapevine'],
]

// This is our plantable crop.
function create_crop(event, id, name, dropCount, hasSeed, cropName) {
  cropName = cropName || name
  event.create(id, 'crop')
    .displayName(cropName)
    .crop('kubejs:' + id, 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      let blockState = level.getBlockState(pos.below())
      let mcBlock = blockState.block
      if (mcBlock instanceof FARMLAND) {
        return true
      }
      else return false
    })
    .age(3, builder => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 6, 16)
    })
    .texture(0, 'kubejs:block/' + id + '_crop_0')
    .texture(1, 'kubejs:block/' + id + '_crop_1')
    .texture(2, 'kubejs:block/' + id + '_crop_2')
    .texture(3, 'kubejs:block/' + id + '_crop_3')
    // .tagBlock('minecraft:mineable/pickaxe')
    .item(seedItem => {
      let textureName = 'kubejs:item/' + id;
      let seedName = name;

      if(hasSeed) {
        textureName += '_seeds'
        seedName += ' Seed'
      }

      seedItem.displayName(seedName)
        .texture(textureName)

      if(!hasSeed) {
        seedItem.food(food => {
          food.hunger(2).saturation(1)
        })
      }
    })
}

// These are crops that appear in the wild, but don't grow.
function create_wild_crop(event, id, name, dropCount, hasSeed) {
    let drop = 'kubejs:' + id
    if(hasSeed) {
      drop += '_seeds'
    }

    event.create('wild_' + id)
      .displayName('Wild ' + name)
      .soundType('crop')
      .renderType('cutout')
      .notSolid()
      .hardness(0)
}

global.foodFluids.push({'name': 'orange_juice', 'title': 'Orange Juice', 'ingredients': ['1x kubejs:orange'], 'color': 0xffcc00, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/yellow_bottle'})
global.foodFluids.push({'name': 'orange_jam', 'title': 'Orange Jam', 'ingredients': ['4x kubejs:orange_slice', 'minecraft:sugar', {'fluid': 'minecraft:water', 'amount': 250}], 'color': 0xff9900, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/orange_jar'})
global.foodFluids.push({'name': 'grape_juice', 'title': 'Grape Juice', 'ingredients': ['3x kubejs:grape'], 'color': 0xcc00ff, 'texture': 'thin', 'method': 'crushing', 'bottled': 'kubejs:item/purple_bottle'})
global.foodFluids.push({'name': 'grape_jam', 'title': 'Grape Jam', 'ingredients': ['3x kubejs:grape', 'minecraft:sugar', {'fluid': 'minecraft:water', 'amount': 250}], 'color': 0xcc00ff, 'texture': 'thick', 'method': 'mixing', 'heated': true, 'bottled': 'kubejs:item/purple_jar'})

StartupEvents.registry('item', event => {
  for(const i = 0; i < global.custom_crops.length; i++) {
    let custom_crop = global.custom_crops[i];

    // If the crop has a separate seed, then we need to create the basic food here.
    if(custom_crop[3]) {
      createFoodShort(event, custom_crop[0], custom_crop[1])
    }
  }

  // Create foods related to the new crops
  event.create('cut_chile_pepper').displayName('Cut Chile Peppers')
  event.create('cut_green_pepper').displayName('Cut Green Peppers')
  event.create('salsa').displayName('Salsa').tooltip('Diced peppers and tomatoes')

  createFoodShort(event, 'roasted_chiles', 'Roasted Chiles')
  createFoodShort(event, 'kimchi_cabbage', 'Cabbage Kimchi', 'Spicy fermented cabbage.')
  createFoodShort(event, 'kimchi_cucumber', 'Cucumber Kimchi', 'Spicy fermented cucumber.')
  event.create('chile_powder').displayName('Chile Powder')
  createBottledFluid(event, {'name': 'chile_paste', 'title': 'Chile Paste', 'color': 0xaa0000, 'texture': 'thick'})

  createFoodShort(event, 'orange_slice', 'Orange Slice', 2, 1)
  createFoodShort(event, 'orange_gummy', 'Orange Gummy', 2, 1).texture('collectorsreap:item/pumpkin_gummy')
  createFoodShort(event, 'grape_gummy', 'Grape Gummy', 2, 1).texture('collectorsreap:item/beetroot_gummy')

  // Jaffa cakes
  event.create('cookie_base').displayName('Cookie Base')
  event.create('raw_cookie_base').displayName('Raw Cookie Base').texture('kubejs:item/cookie_base').tooltip('You need to cook this before you can use it.')
  createFoodShort(event, 'jaffa_cake', 'Jaffa Cake', 4, 2).tooltip('The Yogscast\'s favorite treat.')
  createIncompleteItem(event, 'jaffa_cake', 'kubejs:item/cookie_base')
})

StartupEvents.registry('fluid', event => {
  createFluid(event, {'name': 'chile_paste', 'title': 'Chile Paste', 'color': 0xaa0000, 'texture': 'thick'})
})

StartupEvents.registry('block', event => {
  for(const i = 0; i < global.custom_crops.length; i++) {
    let crop = global.custom_crops[i];

    create_crop(event, crop[0], crop[1], crop[2], crop[3], crop[4])
    create_wild_crop(event, crop[0], crop[1], crop[2], crop[3])
  }

  /***
   * Replacements for crops that don't act how we want.
   **/

  // Fix coffee to work on normal farmland
  event.create('coffee', 'crop')
    .displayName('Coffee Beans')
    // .crop('kubejs:coffee_berry', 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      let blockState = level.getBlockState(pos.below())
      let mcBlock = blockState.block
      if (mcBlock instanceof FARMLAND) {
        return true
      }
      else return false
    })
    .age(3, builder => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 6, 16)
    })
    .texture(0, 'kubejs:block/coffee_bean_crop_0')
    .texture(1, 'kubejs:block/coffee_bean_crop_1')
    .texture(2, 'kubejs:block/coffee_bean_crop_2')
    .texture(3, 'kubejs:block/coffee_bean_crop_3')
    // .tagBlock('minecraft:mineable/pickaxe')
    .item(seedItem => {
      seedItem.displayName('Coffee Bean')
        .tooltip('You need to roast these to make coffee')
    })

  // Pomegranate and lime don't grow without bees.
  // Create a domesticated version that acts normal instead.

  event.create('lime', 'crop')
    .displayName('Cultivated Lime Bush')
    // .crop('kubejs:coffee_berry', 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      let blockState = level.getBlockState(pos.below())
      let mcBlock = blockState.block
      if (mcBlock instanceof FARMLAND || mcBlock instanceof GRASS) {
        return true
      }
      else return false
    })
    .age(3, builder => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 6, 16)
    })
    .texture(0, 'kubejs:block/lime_crop_0')
    .texture(1, 'kubejs:block/lime_crop_1')
    .texture(2, 'kubejs:block/lime_crop_2')
    .texture(3, 'kubejs:block/lime_crop_3')
    // .tagBlock('minecraft:mineable/pickaxe')
    .item(seedItem => {
      seedItem.displayName('Lime Seed').texture('collectorsreap:item/lime_seeds')
    //     .tooltip('You need to roast these to make coffee')
    })

  event.create('pomegranate', 'crop')
    .displayName('Cultivated Pomegranate Bush')
    // .crop('kubejs:coffee_berry', 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      let blockState = level.getBlockState(pos.below())
      let mcBlock = blockState.block
      if (mcBlock instanceof FARMLAND || mcBlock instanceof GRASS) {
        return true
      }
      else return false
    })
    .age(3, builder => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 6, 16)
    })
    .texture(0, 'kubejs:block/pomegranate_crop_0')
    .texture(1, 'kubejs:block/pomegranate_crop_1')
    .texture(2, 'kubejs:block/pomegranate_crop_2')
    .texture(3, 'kubejs:block/pomegranate_crop_3')
    // .tagBlock('minecraft:mineable/pickaxe')
    .item(seedItem => {
      seedItem.displayName('Pomegranate Seed').texture('collectorsreap:item/pomegranate_seeds')
    //     .tooltip('You need to roast these to make coffee')
    })

  event.create('avocado', 'crop')
    .displayName('Cultivated Avocado Bush')
    // .crop('kubejs:coffee_berry', 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      let blockState = level.getBlockState(pos.below())
      let mcBlock = blockState.block
      if (mcBlock instanceof FARMLAND || mcBlock instanceof GRASS) {
        return true
      }
      else return false
    })
    .age(3, builder => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 6, 16)
    })
    .texture(0, 'kubejs:block/avocado_crop_0')
    .texture(1, 'kubejs:block/avocado_crop_1')
    .texture(2, 'kubejs:block/avocado_crop_2')
    .texture(3, 'kubejs:block/avocado_crop_3')
    // .tagBlock('minecraft:mineable/pickaxe')
    .item(seedItem => {
      seedItem.displayName('Avocado Pit').texture('culturaldelights:item/avocado_pit')
    //     .tooltip('You need to roast these to make coffee')
    })

})
