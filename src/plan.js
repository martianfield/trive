'use strict'
const setthings = require('setthings')

// default options
const defaultOptions = {
  slots:0,  // any sequence slot higher than this value will override this
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
      if(sequence.slot >= plan.slots) {
        plan.slots = sequence.slot + 1
      }
      if(plan.cycles[i] === undefined) {
        plan.cycles[i] = []
      }
      if(plan.cycles[i][sequence.slot] === undefined) {
        plan.cycles[i][sequence.slot] = []
      }
      plan.cycles[i][sequence.slot].push(sequence.items[i])
    }
  })

  return plan
}

// module exports
module.exports.create = create