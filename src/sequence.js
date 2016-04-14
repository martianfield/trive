'use strict'
const merge = require('setthings').merge

// cache
let cache = new Map()

// exported 'enums'
const modes = Object.freeze({
  'Linear':0,
  'Exponential':1
})

const units = Object.freeze({
  'Seconds': 0,
  'Minutes': 1,
  'Hours': 2
})

// default options
const defaultOptions = {
  initial:1,
  cycles:1,
  mode: modes.Linear,
  unit: units.Minutes,
  increase: 1,
  slot: 0,   // the slot within the cycle (e.g. day of the week, if a cycle is one week long)
  governor: null,
  title:"",
  description:""
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
    items: [],
    slot: options.slot,
    description: options.description,
    title: options.title
  }

  // cache (if there is a name)
  if(options.name) {
    cache.set(options.name, sequence)
  }

  // governor ?
  if(options.governor) {
    for(let i=0; i < options.governor.items.length; i++) {
      let item = {
        sequence: sequence
      }
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
      let item = {
        sequence: sequence
      }

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