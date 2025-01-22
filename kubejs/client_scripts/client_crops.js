// This makes our crop models into "cross" style instead of hash (#) ones.

const fixModels = [
  ['coffee', 'coffee_bean_crop'],
  ['black_beans', 'black_beans_crop'],
  // ['green_pepper', 'green_pepper_crop'],
  // ['chile_pepper', 'chile_pepper_crop'],
  ['lime', 'lime_crop'],
  ['pomegranate', 'pomegranate_crop'],
  ['avocado', 'avocado_crop'],
  ['orange', 'orange_crop'],
]

ClientEvents.highPriorityAssets(event => {
  for(const j = 0; j < fixModels.length; j++) {
    let item = 'kubejs:' + fixModels[j][0];
    let texture = 'kubejs:block/' + fixModels[j][1] + '_';
    for(const i = 0; i < 4; i++) {
      event.addModel('block', item + i, model => {
        model.parent('minecraft:block/cross')
        model.texture('cross', texture + i)
      })
    }
  }
})