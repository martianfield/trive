'use strict'

const expect = require('chai').expect
const trive = require(__dirname + '/../index.js')
const plan = trive.plan
const sequence = trive.sequence

describe("Plan", () => {
  let s0, s1, s2
  before(() => {
    s0 = sequence.create({
      cycles:5,
      slot:0
    })
    s1 = sequence.create({
      cycles:10,
      slot:1
    })
    s2 = sequence.create({
      cycles:15,
      slot:2
    })
  })

  it('Number of Cycles', () => {
    // arrange
    let p_options = {}
    // act
    let p1 = plan.create(p_options, s0)
    let p2 = plan.create(p_options, s0, s1)
    let p3 = plan.create(p_options, s0, s1, s2)
    // assert
    expect(p1.cycles.length).to.equal(5)  // since the largest (and only) sequence is 5 cycles long
    expect(p2.cycles.length).to.equal(10)  // since the largest sequence is 10 cycles long
    expect(p3.cycles.length).to.equal(15)  // since the largest sequence is 15 cycles long
  })
})