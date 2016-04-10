'use strict'

const expect = require('chai').expect
const sequence = require(__dirname + '/../src/sequence')
const setthings = require('setthings')

describe("Sequence", () => {
  it("Caching", () => {
    // arrange
    let options = { name: 'a' }
    // act
    let s1 = sequence.create(options)
    let s2 = sequence.fromCache(options.name)
    // assert
    expect(s1).to.deep.equal(s2)
  })
  
  it("Number of items", () => {
    // arrange
    let options = {
      cycles: 10
    }
    // act
    let s = sequence.create(options)
    // assert
    expect(s.items.length).to.equal(10)
  })

  it("Linear Mode", () => {
    // arrange
    let options = {
      initial:10,
      cycles:3,
      increase:5,
      mode:sequence.modes.Linear
    }
    // act
    let s = sequence.create(options)
    // assert
    expect(s.items[0].value).to.equal(10)
    expect(s.items[1].value).to.equal(15)
    expect(s.items[2].value).to.equal(20)
  })

  it("Exponential Mode", () => {
    // arrange
    let options = {
      initial:10,
      cycles:3,
      increase:1.5,
      mode:sequence.modes.Exponential
    }
    // act
    let s = sequence.create(options)
    // assert
    expect(s.items[0].value).to.equal(10)
    expect(s.items[1].value).to.equal(15)
    expect(s.items[2].value).to.equal(22.5)
  })
})

