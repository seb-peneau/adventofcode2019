const getLayers = require("../index").getLayers
const getMinZeroLayer = require("../index").getMinZeroLayer
const decodeImage = require("../index").decodeImage

const expect = require('chai').expect

describe('test suite for problem 8 of advent of code 2019', () => {

  it('should return correct number of layers for 123456789012', () => {
    expect(getLayers(123456789012, 3, 2).length).to.be.equal(2)
  })

  it('should return layer that contain less 0', () => {
    expect(getMinZeroLayer(123456789012, 3, 2)).to.be.eql([1,2,3,4,5,6])
  })

  it('should return the correct decoded image', () => {
    expect(decodeImage("0222112222120000", 2, 2)).to.be.eql([[0,1],[1, 0]])
  })
})