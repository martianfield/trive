'use strict'

const expect = require('chai').expect
const sequence = require(__dirname + '/../src/sequence')

describe("Sequence", () => {
  it("number of items", () => {
    // arrange
    let options = {
      cycles: 10
    }
    // act
    let s = sequence.create(options)
    // assert
    expect(s.items.length).to.equal(10)
  })
})

