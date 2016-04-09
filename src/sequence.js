'use strict'

// modules
const merge = require('setthings').merge

// exported 'enums'
const modes = Object.freeze({
  'Linear':0,
  'Exponential':1
})

// exported methods
const defaultOptions = {
  initial:1,
  cycles:1,
  mode: modes.Linear,
  increase: 1
}

const create = (options) => {
  merge(options, defaultOptions)
  let sequence = {
    items: []
  }

  let previousItem = undefined
  for(let i=0; i < options.cycles; i++) {
    let item = {}

    if(previousItem === undefined) {
      item.value = options.initial
    }
    else {
      switch(options.mode) {
        case modes.Linear:
          item.value = previousItem.value + options.increase
          break
        case modes.Exponential:
          item.value = previousItem.value * options.increase
          break
        default:
          item.value = options.initial
          break
      }
    }

    sequence.items.push(item)
    previousItem = item
  }

  return sequence
}


module.exports.create = create
module.exports.modes = modes