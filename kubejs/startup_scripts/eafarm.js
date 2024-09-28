/* Tea Tweaks */

/*
  Farmer's Respite doesn't do a very good job with tea. I love tea! So let's fix it.
  Also check out the server script that modifies our loot drops and processing recipes.
*/

// On startup, create new tea items.
StartupEvents.registry('item', e => {
  e.create('partially_oxidized_tea')
    .texture('farmersrespite:item/yellow_tea_leaves') // This texture is from Farmer's Respite!
    .displayName('Partially Oxidized Tea')
    .tooltip('Tea leaves that have been bruised to partially oxidize them. Roast these to make oolong tea, or process them again to make fully oxidized black tea.')

  e.create('fully_oxidized_tea')
    .texture('farmersrespite:item/black_tea_leaves') // This texture is from Farmer's Respite!
    .displayName('Fully Oxidized Tea')
    .tooltip('Tea leaves that have been bruised twice to fully oxidize them. Roast these to make black tea.')
})
