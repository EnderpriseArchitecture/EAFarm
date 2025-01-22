// priority: 1
// This script is run last, after our various arrays have been built.

StartupEvents.registry('fluid', event => {
  for(let i = 0; i < global.foodFluids.length; i++) {
    let conf = global.foodFluids[i];
    createFluid(event, conf);
  }
})

StartupEvents.registry('item', event => {
  for(let i = 0; i < global.foodFluids.length; i++) {
    let conf = global.foodFluids[i];

    if(!conf.bottle) {
      createBottledFluid(event, conf);
    }
  }
})