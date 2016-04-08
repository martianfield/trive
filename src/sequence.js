'use strict'

const merge = require('setthings').merge

const defaultOptions = {
  cycles:1
}

const create = (options) => {
  merge(options, defaultOptions)
  let sequence = {
    items: []
  }

  for(let i=0; i < options.cycles; i++) {
    sequence.items.push({})
  }

  return sequence
}


module.exports.create = create