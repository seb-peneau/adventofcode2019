const getAllLines = require("../index").getAllLines
const findIntersect = require("../index").findIntersect
const findMinimalDistance = require("../index").findMinimalDistance
const findMinimalSteps = require("../index").findMinimalSteps

const expect = require('chai').expect

describe('test suite for problem 1 of advent of code 2019', () => {

  it('should return correct path for input U4', () => {
    expect(getAllLines("U4")).to.be.eql([{"steps": 0 ,"xs": 0, "ys": 0, "xe": 0, "ye": 4}])
  })

  it('should return correct path for input U2,L1', () => {
    expect(getAllLines("U2,L1")).to.be.eql([{"steps": 0,"xs": 0, "ys": 0, "xe": 0, "ye": 2}, {"steps": 2 ,"xs": 0, "ys": 2, "xe": -1, "ye": 2}])
  })

  it('should find the intersect between 2 single lines', () => {
    expect(findIntersect("U2,R10", "R5,U4")).to.be.eql([{"steps": 14,"x":5, "y":2}])
  })

  it('should find minimal distance between R8,U5,L5,D3 and U7,R6,D4,L4', () => {
    expect(findMinimalDistance("R8,U5,L5,D3", "U7,R6,D4,L4")).to.be.eql(6)
  })

  it('should find minimal distance between R75,D30,R83,U83,L12,D49,R71,U7,L72 and U62,R66,U55,R34,D71,R55,D58,R83', () => {
    expect(findMinimalDistance("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83")).to.be.eql(159)
  })

  it('should find minimal distance between R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51 and U98,R91,D20,R16,D67,R40,U7,R15,U6,R7', () => {
    expect(findMinimalDistance("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7")).to.be.eql(135)
  })

  it('should find minimal steps between R8,U5,L5,D3 and U7,R6,D4,L4', () => {
    expect(findMinimalSteps("R8,U5,L5,D3", "U7,R6,D4,L4")).to.be.eql(30)
  })  

  it('should find minimal steps between R75,D30,R83,U83,L12,D49,R71,U7,L72 and U62,R66,U55,R34,D71,R55,D58,R83', () => {
    expect(findMinimalSteps("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83")).to.be.eql(610)
  })

  it('should find minimal steps between R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51 and U98,R91,D20,R16,D67,R40,U7,R15,U6,R7', () => {
    expect(findMinimalSteps("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7")).to.be.eql(410)
  }) 
})