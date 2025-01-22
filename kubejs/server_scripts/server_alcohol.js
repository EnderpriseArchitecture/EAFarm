// priority: 40

/***
 * Handle alcohol flag.
 **/

global.standard_brewing_time = 500

function updateDrinks(event) {
  global.showDrinks = event.getEntity().stages.has('alcohol')
}

GameStageEvents.stageAdded(event => {
  updateDrinks(event);
});

GameStageEvents.stageRemoved(event => {
  updateDrinks(event);
});

PlayerEvents.loggedIn(event => {
  updateDrinks(event);
});

ServerEvents.recipes(event => {
  for(let i = 0; i < global.alcohol.length; i++) {
    let drink = global.alcohol[i];

    // Make the base alcohol
    let recipe = event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_brewing_time)
      .produceFluid(Fluid.of('kubejs:' + drink.name, 1000))

    if(drink.fluid) {
      recipe.requireFluid(Fluid.of(drink.fluid, 1000))
    }

    if(drink.ingredient1) {
      recipe.requireItem(Item.of(drink.ingredient1))
    }

    recipe.stage('alcohol')

    // Bottling recipe
    event.recipes.create.filling('kubejs:' + drink.name + '_bottle', [Fluid.of('kubejs:' + drink.name, 250), 'minecraft:glass_bottle']).stage('alcohol')

    event.recipes.create.emptying([Fluid.of('kubejs:' + drink.name, 250), 'minecraft:glass_bottle'], 'kubejs:' + drink.name + '_bottle').stage('alcohol')
  }

  for(let i = 0; i < global.mixedDrinks.length; i++) {
    let drink = global.mixedDrinks[i]

    let mix = event.recipes.create.mixing({'fluid': 'kubejs:' + drink.name, 'amount': 250}, drink.ingredients).stage('alcohol')

    event.recipes.create.filling('kubejs:' + drink.name + '_bottle', [Fluid.of('kubejs:' + drink.name, 250), 'minecraft:glass_bottle']).stage('alcohol')
    event.recipes.create.emptying([Fluid.of('kubejs:' + drink.name, 250), 'minecraft:glass_bottle'], 'kubejs:' + drink.name + '_bottle').stage('alcohol')

    /*
    let incomplete = 'kubejs:incomplete_' + drink.name

    // Build our assembly steps.
    let steps = []

    for(let j = 1; j < drink.ingredients.length; j++) {
      // Deploy
      if(ingredients.item) {
        steps.push(event.recipes.createDeploying(incomplete, [incomplete, ingredients[j]]))
      }
      // Fill
      else if(ingredients.fluid) {
        steps.push(event.recipes.createFilling(incomplete, [incomplete, fluidIngredient]))
      }
    }

    // Finally, build the sequence.
    event.recipes.create.sequenced_assembly(
      id,
      'minecraft:bottle', // The first ingredient in the list is the one we start with.
      steps
    ).transitionalItem(incomplete).loops(1)
    */
  }

  // If alcohol is allowed, we make rice vinegar from rice wine.

  if(global.showDrinks) {
    event.remove({'output': Fluid.of('kubejs:rice_vinegar')})

    event.recipes.custommachinery.custom_machine('custommachinery:fermenter', global.standard_pickling_time)
      .requireFluid(Fluid.of('kubejs:sake', 1000))
      .produceFluid(Fluid.of('kubejs:rice_vinegar', 1000))
  }
})