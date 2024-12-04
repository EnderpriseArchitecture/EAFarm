// priority: 80

/***
 * New Custom Crops
 *
 * Things that aren't in any of the other mods, but should be.
 **/

// [id, display name, amount to drop, has a seed]
global.custom_crops = [
  // Crops that use their food item as seed, like beans.
  ['black_beans', 'Black beans', [2,4], false],

  // Crops that use a separate seed.
  ['green_pepper', 'Green Pepper', [2,4], true],
  ['chile_pepper', 'Chile Pepper', [2,4], true]
]

// This is our plantable crop.
function create_crop(event, id, name, dropCount, hasSeed) {
  event.create(id, 'crop')
    .displayName(name)
    .crop('kubejs:' + id, 4)
    .growTick((tickevent) => 1)
    .dropSeed(true)
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass('net.minecraft.world.level.block.FarmBlock')
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
        seedName += ' Seeds'
      }

      seedItem.displayName(name)
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
  createBottledFluid(event, {'name': 'chile_paste', 'title': 'Chile Paste', 'color': 0xaa0000, 'texture': 'thick'});
})

StartupEvents.registry('fluid', event => {
  createFluid(event, {'name': 'chile_paste', 'title': 'Chile Paste', 'color': 0xaa0000, 'texture': 'thick'});
})

StartupEvents.registry('block', event => {

  for(const i = 0; i < global.custom_crops.length; i++) {
    let crop = global.custom_crops[i];

    create_crop(event, crop[0], crop[1], crop[2], crop[3])
    create_wild_crop(event, crop[0], crop[1], crop[2], crop[3])
  }
})
