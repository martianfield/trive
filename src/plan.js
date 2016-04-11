'use strict'
const setthings = require('setthings')

// default options
const defaultOptions = {
}

// functions
function create(options) {
  setthings.merge(options, defaultOptions)
  // rest parameter not working, so we use the the old fashioned way
  var sequences = Array.prototype.slice.call(arguments, create.length)

  let plan = {
    cycles:[]
  }

  sequences.forEach((sequence) => {
    for(let i = 0; i < sequence.items.length; i++) {
      if(plan.cycles[i] === undefined) {
        plan.cycles[i] = []
      }
      plan.cycles[i].push(sequence.items[i])
    }
  })

  return plan
}

// module exports
module.exports.create = create