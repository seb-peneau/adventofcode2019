const getFuel = require("../index").getFuel
const getFuelForAllModules = require("../index").getFuelForAllModules
const getAdditionnalFuel = require("../index").getAdditionalFuel

const expect = require('chai').expect

describe('test suite for problem 1 of advent of code 2019', () => {

  it('should return 2 for input 12', () => {
    expect(getFuel(12)).to.be.equal(2)
  })

  it('should return 2 for input 14', () => {
    expect(getFuel(14)).to.be.equal(2)
  })

  it('should return 654 for input 1969', () => {
    expect(getFuel(1969)).to.be.equal(654)
  })

  it('should return 33583 for input 100756', () => {
    expect(getFuel(100756)).to.be.equal(33583)
  })

  it('should return 2 for input 12', () => {
    expect(getFuelForAllModules([14, 12], getFuel)).to.be.equal(4)
  })

  it('should return 966 for input 1969', () => {
    expect(getAdditionnalFuel(1969)).to.be.equal(966)
  })

  it('should return 50346 for input 100756', () => {
    expect(getAdditionnalFuel(100756)).to.be.equal(50346)
  })

})