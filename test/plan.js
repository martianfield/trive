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

  it('Number of Slots', () => {
    // arrange / act
    let p1 = plan.create({}, s2)  // s2 sits in slot 2, this should NOT override the plan's default of 1 slots
    let p2 = plan.create({slots:7}, s2) // the plan has 7 slots, s2's slot is less, so the plan should have 7 slots
    // assert
    expect(p1.slots).to.equal(1)
    expect(p2.slots).to.equal(7)
  })

  it('Multi-Slotting', () => {
    // it is possible for sequences to sit in the same slot
    // arrange / act
    let s1 = sequence.create({slot:2, cycles:1})
    let s2 = sequence.create({slot:2, cycles:5})
    let p = plan.create({slots:7}, s1, s2)
    // assert
    expect(p.cycles[0][2].length).to.equal(2)
    expect(p.cycles[1][2].length).to.equal(1)
  })

  it('Slotting of Off-Slot Sequence', () => {
    // sequences that have a slot beyond the slot number of the plan, should be placed in the last slot of the cycle
    // arrange / act
    let s = sequence.create({slot:7, cycles:1, description:'S'})
    let p = plan.create({slots:7}, s)
    // assert
    expect(p.cycles[0][6]).to.not.be.undefined
  })
})