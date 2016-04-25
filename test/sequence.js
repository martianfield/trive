'use strict'

const expect = require('chai').expect
const sequence = require(__dirname + '/../index').sequence// require(__dirname + '/../src/sequence')


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

  it("Slot", () => {
    // arrange
    let o1 = { }
    let o2 = { slot: 3 }
    // act
    let s1 = sequence.create(o1)
    let s2 = sequence.create(o2)
    // assert
    expect(s1.slot).to.equal(0) // o1 has not slot set, so the default 0 will be used
    expect(s2.slot).to.equal(3) // o3 has slot set to 3
  })

  describe("Modes", () => {
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

  describe("Min / Max", () => {
    it("min", () => {
      // arrange
      let options = {
        initial:10,
        cycles:3,
        increase:1,
        mode:sequence.modes.Linear,
        min: 11
      }
      // act
      let s = sequence.create(options)
      // assert
      expect(s.items[0].value).to.equal(11) // without min:11, this would be 10
      expect(s.items[1].value).to.equal(11)
      expect(s.items[2].value).to.equal(12)
    })

    it("max", () => {
      // arrange
      let options = {
        initial:10,
        cycles:3,
        increase:1,
        mode:sequence.modes.Linear,
        max:11
      }
      // act
      let s = sequence.create(options)
      // assert
      expect(s.items[0].value).to.equal(10)
      expect(s.items[1].value).to.equal(11)
      expect(s.items[2].value).to.equal(11) // without max:11, this would be 12
    })
  })

  describe("Governor", () => {
    it("Governor used with Linear Mode", () => {
      // arrange
      let opt_governor = { initial: 10, cycles: 3, increase:10, mode:sequence.modes.Linear}
      let governor = sequence.create(opt_governor)
      let opt = { governor:governor, increase:5, mode:sequence.modes.Linear}
      // act
      let s = sequence.create(opt)
      // assert
      expect(s.items[0].value).to.equal(15)
      expect(s.items[1].value).to.equal(25)
      expect(s.items[2].value).to.equal(35)
    })

    it("Governor used with Exponontial Mode", () => {
      // arrange
      let opt_governor = { initial: 10, cycles: 3, increase:10, mode:sequence.modes.Linear}
      let governor = sequence.create(opt_governor)
      let opt = { governor:governor, increase: 1.5, mode:sequence.modes.Exponential}
      // act
      let s = sequence.create(opt)
      expect(s.items[0].value).to.equal(15)
      expect(s.items[1].value).to.equal(30)
      expect(s.items[2].value).to.equal(45)
    })

  })



})

