const getNbOrbits = require("../index").getNbOrbits
const generateGraph = require("../index").generateGraph
const getAllOrbits = require("../index").getAllOrbits
const getCommonAncester = require("../index").getCommonAncester
const getOrbitalJumps = require("../index").getOrbitalJumps

const expect = require('chai').expect

describe('test suite for problem 1 of advent of code 2019', () => {

  it('should return correct orbit numbers for edge', () => {
    let graphDesc = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L"]
    let graph = generateGraph(graphDesc)
    expect(getNbOrbits('D', graph)).to.be.equal(3)
    expect(getNbOrbits('L', graph)).to.be.equal(7)
    expect(getNbOrbits('COM', graph)).to.be.equal(0)
  })

  it('should return correct total orbit numbers', () => {
    let graphDesc = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L"]
    expect(getAllOrbits(graphDesc)).to.be.equal(42)
  })

  it('should return the correct ancester', () => {
    let graphDesc = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L"]
    let graph = generateGraph(graphDesc)
    expect(getCommonAncester("G", "L", graph)).to.be.equal("B")
  })

  it('should get the correct number of orbital jumps', () => {
    let graphDesc = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L","K)YOU","I)SAN"]
    let graph = generateGraph(graphDesc)
    expect(getOrbitalJumps("SAN", "YOU", graph)).to.be.equal(4)
  })

  
})