'use strict'
const merge = require('setthings').merge

// cache
let cache = new Map()

// exported 'enums'
const modes = Object.freeze({
  'Linear':0,
  'Exponential':1
})

// default options
const defaultOptions = {
  initial:1,
  cycles:1,
  mode: modes.Linear,
  increase: 1
}

/**
 * Creates a sequence using the given options
 * @param options
 * @returns {{items: Array}}
 */
function create(options) {
  // merge options
  merge(options, defaultOptions)

  // prepare
  let sequence = {
    items: []
  }

  // cache (if there is a name)
  if(options.name) {
    cache.set(options.name, sequence)
  }

  // governor ?
  if(options.governor) {
    for(let i=0; i < options.governor.items.length; i++) {
      let item = {}
      switch (options.mode) {
        case modes.Linear:
          item.value = options.governor.items[i].value + options.increase
          break
        case modes.Exponential:
          item.value = options.governor.items[i].value * options.increase
          break
        default:
          item.value = options.governor.items[i].value
          break
      }
      sequence.items.push(item)
    }
  }
  else {
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
  }
  
  return sequence
}

/**
 * Returns a sequence that has been cache.
 * @param name
 * @returns {V}
 */
function fromCache(name) {
  return cache.get(name)
}

// module exports
module.exports.create = create
module.exports.fromCache = fromCache
module.exports.modes = modes