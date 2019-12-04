const isCorrectLength = require("../index").isCorrectLength
const hasSameAdjacent = require("../index").hasSameAdjacent
const neverDecrease = require("../index").neverDecrease
const countFitAll = require("../index").countFitAll
const notInLargerGroup = require("../index").notInLargerGroup
const countFitAllPart2 = require("../index").countFitAllPart2

const expect = require('chai').expect

describe('test suite for problem 1 of advent of code 2019', () => {

  it('should be a 6 length number', () => {
    expect(isCorrectLength(12)).to.be.false
    expect(isCorrectLength(123456)).to.be.true
    expect(isCorrectLength(123098409843)).to.be.false
  })

  it('should have 2 adjacent same digit', () => {
    expect(hasSameAdjacent(12)).to.be.false
    expect(hasSameAdjacent(123456)).to.be.false
    expect(hasSameAdjacent(123098409843)).to.be.false
    expect(hasSameAdjacent(11)).to.be.true
    expect(hasSameAdjacent(12341)).to.be.false
    expect(hasSameAdjacent(123341)).to.be.true
  })

  it("should never decrease", () => {
    expect(neverDecrease(12)).to.be.true
    expect(neverDecrease(123456)).to.be.true
    expect(neverDecrease(123098409843)).to.be.false
    expect(neverDecrease(11)).to.be.true
    expect(neverDecrease(12341)).to.be.false
    expect(neverDecrease(123341)).to.be.false
  })

  it("should find the correct number that fits the requirement of part 1", () => {
    expect(countFitAll([11, 123445, 124356, 112345])).to.be.equal(2)
  })

  it("should not be part of a larger group of digit", () => {
    expect(notInLargerGroup(112233)).to.be.true
    expect(notInLargerGroup(123444)).to.be.false
    expect(notInLargerGroup(111122)).to.be.true
  })

  it("should find the correct number that fits the requirement of part 2", () => {
    expect(countFitAllPart2([11, 123445, 124356, 112345])).to.be.equal(2)
  })
})