// Visit the wiki for more info - https://kubejs.com/

/* TODO:
   * fix hot chocolate recipe : remove duplicates from confectionery and delight, and allow for vegan option, use cocoa powder?
   * make coffee spawn and grow in the overworld?
   * all the dough-related recipes should have an intermediate raw version that has to be smelted.
     * cake base already exists, start with that!
   * fix slime gelatin recipe that's broken below
   * make a copy of all applesauce recipes to use eggs in the mixer.
   * Resolve overlapping recipes in mixer: Salt, tea, tea bruising.
   * Make tea bruising use the press or roller instead
   * Mr. Crayfish's recipes all conflict with our main recipes, need to resolve.
*/

// Note: Kubejs has a couple of weirdnesses with create, notably you can't replace recipe ingredients/outputs, and you
// can't use forge tags for inputs/outputs. As a result, there are a lot of individual duplicative recipes below.


ServerEvents.recipes(e => {

	// The recipe for salt as water in a heated mixer is prone to conflicts, so we need another way to make salt.
	// Removing salt recipes until I think of a better way which has less conflicts.
	// e.custom({
  //   "type": "create:mixing",
  //   "heatRequirement": "heated",
  //   "ingredients": [{
  //     "amount": 10,
  //     "fluid": "minecraft:water"
  //   }],
  //   "results": [
  //       {"item": "vegandelight:salt"}
  //   ]
	// })

	// Replace all recipes using salt.
	e.remove({ "mod": "vegandelight", "output": "vegandelight:salt" })

	e.remove({ "mod": "vegandelight", "output": "vegandelight:tofu" })
	e.custom({
    "type": "create:compacting",
    "ingredients": [{
      "amount": 1000,
      "fluid": "vegandelight:soymilk"
    }],
    "results": [
        {"item": "vegandelight:tofu"}
    ]
	})

	e.remove({ "mod": "vegandelight", "output": "vegandelight:silken_tofu" })
	e.custom({
    "type": "create:mixing",
    "heatRequirement": "heated",
    "ingredients": [{
      "amount": 1000,
      "fluid": "minecraft:water"
    },{
      "amount": 1000,
      "fluid": "vegandelight:soymilk"
    }],
    "results": [
        {"item": "vegandelight:silken_tofu"}
    ]
	})


	// Get straw from wheat not just rice
	e.custom({
	  "type": "farmersdelight:cutting",
	  "ingredients": [
	    {
	      "item": "minecraft:wheat"
	    }
	  ],
	  "result": [
	    {
	      "item": "minecraft:wheat_seeds"
	    },
	    {
	      "item": "farmersdelight:straw"
	    }
	  ],
	  "tool": {
	    "tag": "forge:tools/knives"
	  }
	})

	// Remove default recipes
	e.remove({
		"input": "minecraft:wheat",
		"output": "minecraft:bread"
	})

	// Replace wheat with flour in recipes.

	e.replaceInput(
		{ input: "minecraft:wheat", output: "minecraft:cookie" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "minecraft:cake" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersrespite:coffee_cake" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersrespite:green_tea_cookie" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersdelight:sweet_berry_cookie" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersdelight:honey_cookie" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersdelight:wheat_dough" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersdelight:pie_crust" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "farmersdelight:apple_pie" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	e.replaceInput(
		{ input: "minecraft:wheat", output: "quarkdelight:bucket_of_sweet_gelatine" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	// Todo: fix this
	e.replaceInput(
		{ input: "minecraft:wheat", output: "quarkdelight:bucket_of_sweet_gelatine" },
		"minecraft:wheat",
		"create:wheat_flour"
	)

	// Replace some recipes to make more sense.
	e.remove({
		"input": "minecraft:wheat",
		"output": "some_assembly_required:burger_bun"
	})
	e.shapeless("some_assembly_required:burger_bun", ['#forge:dough', '#forge:seeds'])

	e.remove({ type: "create:mixing", output: "create:dough" })
	e.remove({ type: "create:mixing", output: "farmersdelight:wheat_dough" })
	e.custom({
    "type": "create:mixing",
    "ingredients": [
	    {
	    	"item": "create:wheat_flour"
	    },
	    {
	      "amount": 100,
	      "fluid": "minecraft:water"
	    }
    ],
    "results": [
        {"item": "create:dough"}
    ]
	})


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
		"farmersrespite:melon_juice": ["minecraft:melon_slice", "minecraft:sugar"]
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


	// Add strong and long versions in the mixer.
	// To make this more vegan-friendly we allow any type of milk, including soy, and sugar as an alternative to honey.
	// In the recipes below, note that forge tags DO NOT work for fluids. I don't know why. But this means we end up with duplicative recipes.

	function respite_mixing_teas(inputs, outputs) {
		e.custom({
	    "type": "create:mixing",
	    "heatRequirement": "heated",
	    "ingredients": inputs,
	    "results": outputs
		})
	}

	function respite_mixing_long(input) {
		respite_mixing_teas(
			[
				{
		      "amount": 1000,
		      "fluid": "farmersrespite:" + input
		    },
				{
		      "amount": 100,
		      "fluid": "minecraft:milk"
		    }
		  ],
		  [
		  	{
		      "amount": 1000,
		      "fluid": "farmersrespite:long_" + input
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
		      "amount": 100,
		      "fluid": "vegandelight:soymilk"
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
		      "fluid": "create:honey"
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
		      "amount": 100,
		      "fluid": "cyclic:honey"
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
		"melon_juice",
		"purulent_tea",
		"rose_hip_tea",
		"yellow_tea"
	]

	for(const tea_type of strong_tea_types) {
		respite_mixing_strong(tea_type)
	}

	// Just in case, replace ingredients. This doesn't work for fluids, I don't know why.

	e.replaceInput(
		{ input: "minecraft:milk" },
		"minecraft:milk",
		"#forge:milk"
	)

	e.replaceInput(
		{ input: "create:honey" },
		"create:honey",
		"#forge:honey"
	)

	e.replaceInput(
		{ input: "cyclic:honey" },
		"cyclic:honey",
		"#forge:honey"
	)

})

/* Tea Tweaks */

/*
  Farmer's Respite doesn't do a very good job with tea. I love tea! So let's fix it.
  Also check out the startup script that creates our new custom tea items.
*/


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