'use strict'
const setthings = require('setthings')

// default options
const defaultOptions = {
  slots:1,  // any sequence slot higher than this value will override this
}

// functions
function create(options) {
  setthings.merge(options, defaultOptions)
  // rest parameter not working, so we use the the old fashioned way
  var sequences = Array.prototype.slice.call(arguments, create.length)

  let plan = {
    cycles:[],
    slots:options.slots
  }

  sequences.forEach((sequence) => {
    for(let i = 0; i < sequence.items.length; i++) {
      let slot = sequence.slot
      if(slot >= plan.slots) {
        slot = plan.slots - 1
      }
      if(plan.cycles[i] === undefined) {
        plan.cycles[i] = []
      }
      if(plan.cycles[i][slot] === undefined) {
        plan.cycles[i][slot] = []
      }
      plan.cycles[i][slot].push(sequence.items[i])
    }
  })

  return plan
}

// module exports
module.exports.create = create