// priority: 60


/*
  Farmer's Respite doesn't do a very good job with tea. I love tea! So let's fix it.
  Also check out the startup script that creates our new custom tea items.
*/

ServerEvents.recipes(e => {

  /***
   * Farmer's Respite Recipe changes
   **/

  // This isn't how tea works, fix it

  // green leaves can be bruised to make partially oxidized leaves...
  e.custom({
    "type": "create:pressing",
    "ingredients": [{
      "item": "farmersrespite:green_tea_leaves"
    }],
    "results": [
        {"item": "kubejs:partially_oxidized_tea"}
    ]
  })

  e.custom({
    "type": "create:pressing",
    "ingredients": [{
      "item": "kubejs:partially_oxidized_tea"
    }],
    "results": [
        {"item": "kubejs:fully_oxidized_tea"}
    ]
  })

  // Toasting the oxidized leaves makes the tea.
  e.smelting("farmersrespite:yellow_tea_leaves", "kubejs:partially_oxidized_tea")
  e.smoking("farmersrespite:yellow_tea_leaves", "kubejs:partially_oxidized_tea")

  e.smelting("farmersrespite:black_tea_leaves", "kubejs:fully_oxidized_tea")
  e.smoking("farmersrespite:black_tea_leaves", "kubejs:fully_oxidized_tea")

  // Make all the drinks mixable

  function create_tea(output, inputs) {
    let ingredients = [
      {
        "amount": 1000,
        "fluid": "minecraft:water"
      }
    ]

    for(const item of inputs) {
      ingredients.push({
        "item": item
      })
    }

    e.custom({
      "type": "create:mixing",
      "heatRequirement": "heated",
      "ingredients": ingredients,
      "results": [{
        "amount": 1000,
        "fluid": output
      }]
    })
  }

  const basic_teas = {
    "farmersrespite:green_tea": ["farmersrespite:green_tea_leaves"],
    "farmersrespite:yellow_tea": ["farmersrespite:yellow_tea_leaves"],
    "farmersrespite:black_tea": ["farmersrespite:black_tea_leaves"],
    "farmersrespite:coffee": ["farmersrespite:coffee_beans"],
    "farmersrespite:rose_hip_tea": ["farmersrespite:rose_hips"],
    "farmersrespite:dandelion_tea": ["minecraft:dandelion", "farmersrespite:green_tea_leaves"],
    "farmersrespite:purulent_tea": ["minecraft:fermented_spider_eye", "minecraft:nether_wart"],
    "farmersrespite:gamblers_tea": ["minecraft:glow_berries", "farmersrespite:coffee_berries"],
    "farmersrespite:apple_cider": ["minecraft:apple", "minecraft:sugar"],
    // "farmersrespite:melon_juice": ["minecraft:melon_slice", "minecraft:sugar"]
  }

  for(const key in basic_teas) {
    create_tea(key, basic_teas[key])
  }

  e.custom({
    "type": "create:mixing",
    "heatRequirement": "heated",
    "ingredients": [
      {
        "item": "minecraft:cocoa_beans"
      },
      {
        "item": "minecraft:sugar"
      },
      {
        "amount": 1000,
        "fluid": "minecraft:milk"
      }
    ],
    "results": [{
      "amount": 1000,
      "fluid": "farmersrespite:hot_cocoa"
    }]
  })
  e.custom({
    "type": "create:mixing",
    "heatRequirement": "heated",
    "ingredients": [
      {
        "item": "minecraft:cocoa_beans"
      },
      {
        "item": "minecraft:sugar"
      },
      {
        "amount": 1000,
        "fluid": "vegandelight:soymilk"
      }
    ],
    "results": [{
      "amount": 1000,
      "fluid": "farmersrespite:hot_cocoa"
    }]
  })


  // Add strong (sweet) and long (milk) versions in the mixer.
  // To make this more vegan-friendly we allow any type of milk, including soy, and sugar as an alternative to honey.
  // In the recipes below, note that forge tags DO NOT work for fluids. I don't know why. But this means we end up with duplicative recipes.

  function respite_mixing_teas(inputs, outputs) {
    e.recipes.create.mixing(outputs, inputs).heated()
  }

  function respite_mixing_long(input) {
    respite_mixing_teas(
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:" + input
        },
          {
            "fluidTag": "forge:milk",
            "amount": 1000
          }
      ],
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:long_" + input
        }
      ]
    )
  }

  function respite_mixing_strong(input) {
    respite_mixing_teas(
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:" + input
        },
        {
          "amount": 100,
          "fluidTag": "forge:honey"
        }
      ],
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:strong_" + input
        }
      ]
    )

    respite_mixing_teas(
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:" + input
        },
        {
          "item": "minecraft:sugar"
        }
      ],
      [
        {
          "amount": 1000,
          "fluid": "farmersrespite:strong_" + input
        }
      ]
    )

    e.custom(
      {
        "type": "farmersrespite:brewing",
        "base": {
          "count": 1000,
          "fluid": "farmersrespite:" + input
        },
        "cookingtime": 2400,
        "experience": 0.35,
        "ingredients": [
          {
            "item": "minecraft:sugar"
          }
        ],
        "result": {
          "count": 1000,
          "fluid": "farmersrespite:strong_" + input
        }
      }
    )

  }

  const long_tea_types = [
    "apple_cider",
    "black_tea",
    "coffee",
    "dandelion_tea",
    "gamblers_tea",
    "green_tea",
    "purulent_tea",
    "rose_hip_tea",
    "yellow_tea"
  ]

  for(const tea_type of long_tea_types) {
    respite_mixing_long(tea_type)
  }

  const strong_tea_types = [
    "apple_cider",
    "black_tea",
    "coffee",
    "gamblers_tea",
    "green_tea",
    "hot_cocoa",
    // "melon_juice",
    "purulent_tea",
    "rose_hip_tea",
    "yellow_tea"
  ]

  for(const tea_type of strong_tea_types) {
    respite_mixing_strong(tea_type)
  }

})


LootJS.modifiers(e => {
  // Tea doesn't spawn very often, and only in swamps, so add tea seeds to chests in villages.
  e.addLootTableModifier(/^minecraft:chests\/.*/)
    .anyStructure(["minecraft:village", "minecraft:village_desert", "minecraft:village_plains", "minecraft:village_savanna", "minecraft:village_taiga", "minecraft:village_snowy"], false)
    .randomChance(0.5)
    .addLoot("farmersrespite:tea_seeds")

  // Who wants to go all the way to the nether for coffee?
  e.addLootTableModifier(/^minecraft:chests\/.*/)
    .anyStructure(["minecraft:village", "minecraft:village_desert", "minecraft:village_plains", "minecraft:village_savanna", "minecraft:village_taiga", "minecraft:village_snowy"], false)
    .randomChance(0.5)
    .addLoot("farmersrespite:coffee_berries")

  // We don't need another source of sticks
  e.addBlockLootModifier("farmersrespite:tea_bush").removeLoot("minecraft:stick")

  // This isn't how tea works, fix it

  // Tea bushes should only drop green leaves.
  e.addBlockLootModifier("farmersrespite:tea_bush").replaceLoot("farmersrespite:yellow_tea_leaves", "farmersrespite:green_tea_leaves")
  e.addBlockLootModifier("farmersrespite:tea_bush").replaceLoot("farmersrespite:black_tea_leaves", "farmersrespite:green_tea_leaves")

})
