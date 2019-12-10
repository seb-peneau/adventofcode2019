const getAllAsteroids = require("../index").getAllAsteroids
const countVisibleAsteroids = require("../index").countVisibleAsteroids
const findBestAsteroids = require("../index").findBestAsteroids

const expect = require('chai').expect

describe('test suite for advent of code 9', () => {

  it('should return all asteroids coordinates', () => {
    let input = [".#..#","....."]
    expect(getAllAsteroids(input)).to.be.eql([{"x": 1, "y": 0}, {"x": 4, "y": 0}])
  })

  it('should count all visible asteroids', () => {
    let input = [".##.#","....."]
    expect(countVisibleAsteroids(getAllAsteroids(input), {"x":1, "y":0}, [])).to.be.equal(1)
    expect(countVisibleAsteroids(getAllAsteroids(input), {"x":2, "y":0}, [])).to.be.equal(2)
    input = ["......#.#.","#..#.#....","..#######.",".#.#.###..",".#..#.....","..#....#.#","#..#....#.",".##.#..###","##...#..#.",".#....####"]
    expect(countVisibleAsteroids(getAllAsteroids(input), {"x":5, "y":8}, [])).to.be.equal(33)    
  })

  it('should find the greatest asteroid visible point of view', () => {
    let input = [".##.#","....."]
    expect(findBestAsteroids(getAllAsteroids(input)).max).to.be.equal(2)
    input = ["......#.#.","#..#.#....","..#######.",".#.#.###..",".#..#.....","..#....#.#","#..#....#.",".##.#..###","##...#..#.",".#....####"]
    expect(findBestAsteroids(getAllAsteroids(input)).max).to.be.equal(33)
    input = ["#.#...#.#.",".###....#.",".#....#...","##.#.#.#.#","....#.#.#.",".##..###.#","..#...##..","..##....##","......#...",".####.###."]
    expect(findBestAsteroids(getAllAsteroids(input)).max).to.be.equal(35)
    input = [".#..#..###","####.###.#","....###.#.","..###.##.#","##.##.#.#.","....###..#","..#.#..#.#","#..#.#.###",".##...##.#",".....#.#.."]
    expect(findBestAsteroids(getAllAsteroids(input)).max).to.be.equal(41)
    input = [".#..##.###...#######","##.############..##.",".#.######.########.#",".###.#######.####.#.","#####.##.#.##.###.##","..#####..#.#########","####################","#.####....###.#.#.##","##.#################","#####.##.###..####..","..######..##.#######","####.##.####...##..#",".#####..#.######.###","##...#.##########...","#.##########.#######",".####.#.###.###.#.##","....##.##.###..#####",".#.#.###########.###","#.#.#.#####.####.###","###.##.####.##.#..##"]
    expect(findBestAsteroids(getAllAsteroids(input)).max).to.be.equal(210)
  })

})