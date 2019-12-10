
function getAngle (a, b, c) {
  let numerator = b.y * (a.x - c.x) + a.y * (c.x - b.x) + c.y * (b.x - a.x)
  let denominator = (b.x - a.x) * (a.x - c.x) + (b.y - a.y) * (a.y - c.y)
  let ratio = numerator/denominator
  let angleRad = Math.atan(ratio);
  let angleDeg = angleRad*180/Math.PI;
  if (c.x <= a.x) {
    angleDeg += 180
  } else if (a.y < c.y) {
    angleDeg += 360
  }
  return angleDeg;
}

function getAllAsteroids (input) {
  input = input.map(x => x.split(''))
  let asteroids = []
  input.forEach((x, j) => {
    x.forEach((y, i) => {
      if (y == "#") {
        asteroids.push({"x": i, "y": j})
      }
    })
  })
  return asteroids
}

function countVisibleAsteroids (asteroids, origin, cache) {
  let count = 0
  let angles = []
  asteroids.forEach(x => {
    if (JSON.stringify(x) != JSON.stringify(origin)) {
      let a = getAngle(origin, {"x": origin.x + 999, "y": origin.y}, x)
      angles.push(a)
    }
  })
  angles = [...new Set(angles)]
  count = angles.length
  return count
}

function findBestAsteroids (asteroids) {
  let max = 0
  var xmax = {} 
  asteroids.forEach((x, index, m) => {
    let val = countVisibleAsteroids(asteroids, x)
    max = Math.max(max, val)
    if (max == val) {
      xmax = x
    }
  })
  return {"max":max, "asteroid": xmax}
}

function vaporize (asteroids, origin) {
  let count = 0
  let found = {}
  asteroids = asteroids.map((x, index) => {
    if (JSON.stringify(x) != JSON.stringify(origin)) {
      let a = getAngle(origin, {"x": origin.x + 999, "y": origin.y}, x)
      a = (a == 0) ? 0 : a
      return {"asteroid": x, "angle": a, "index": index}
    }
  })

  let sortedAsteroids = asteroids.sort((a,b) => {
    return b.angle - a.angle || b.asteroid.y - a.asteroid.y || b.asteroid.x - a.asteroid.x
  })

  let preserve = []

  let firstRound = sortedAsteroids.filter(a => (a && a.angle <= 90 && a.angle >=0))
  firstRound.map((x, index, m) => {
    if (index > 0) {
      if (m[index-1].angle !== x.angle) {
        count++
        asteroids = asteroids.filter((a) => (a && x.index != a.index))
      } else {
        preserve.push(x)
      }
    } else {
      count++
      asteroids = asteroids.filter((a) => (a && x.index != a.index))
    }
    return x
  })

  sortedAsteroids = asteroids.sort((a,b) => {
    return b.angle - a.angle || b.asteroid.y - a.asteroid.y || b.asteroid.x - a.asteroid.x
  })

  let secondRound = sortedAsteroids.filter(a => (a && a.angle < 360 && a.angle >=270))
  secondRound.map((x, index, m) => {
    if (index > 0) {
      if (m[index-1].angle !== x.angle) {
        count++
        if (count == 200) {
          found = x
        }
        asteroids = asteroids.filter((a) => (a && x.index != a.index))

      } else {
        preserve.push(x)
      }
    } else {
      count++
      asteroids = asteroids.filter((a) => (a && x.index != a.index))
    }
    return x
  })

  sortedAsteroids = asteroids.sort((a,b) => {
    return b.angle - a.angle || b.asteroid.y - a.asteroid.y || b.asteroid.x - a.asteroid.x
  })

  let thirdRound = sortedAsteroids.filter(a => (a && a.angle >= 180 && a.angle < 270))

  thirdRound.map((x, index, m) => {
    if (index > 0) {
      if (m[index-1].angle !== x.angle) {
        count++
        if (count == 200) {
          found = x
        }
        asteroids = asteroids.filter((a) => (a && x.index != a.index))

      } else {
        preserve.push(x)
      }
    } else {
      count++
      asteroids = asteroids.filter((a) => (a && x.index != a.index))
    }
    return x
  })

  sortedAsteroids = asteroids.sort((a,b) => {
    return b.angle - a.angle || b.asteroid.y - a.asteroid.y || b.asteroid.x - a.asteroid.x
  })

  let fourthRound = sortedAsteroids.filter(a => (a && a.angle < 180 && a.angle > 90))
  fourthRound.map((x, index, m) => {
    if (index > 0) {
      if (m[index-1].angle !== x.angle) {
        count++
        if (count == 200) {
          found = x
        }
        asteroids = asteroids.filter((a) => (a && x.index != a.index))

      } else {
        preserve.push(x)
      }
    } else {
      count++
      asteroids = asteroids.filter((a) => (a && x.index != a.index))
    }
    return x
  })
  return found
}

module.exports = {
  "getAllAsteroids": getAllAsteroids,
  "countVisibleAsteroids": countVisibleAsteroids,
  "findBestAsteroids": findBestAsteroids,
  "vaporize": vaporize
}

let input = ["....#...####.#.#...........#........","#####..#.#.#......#####...#.#...#...","##.##..#.#.#.....#.....##.#.#..#....","...#..#...#.##........#..#.......#.#","#...##...###...###..#...#.....#.....","##.......#.....#.........#.#....#.#.","..#...#.##.##.....#....##..#......#.","..###..##..#..#...#......##...#....#","##..##.....#...#.#...#......#.#.#..#","...###....#..#.#......#...#.......#.","#....#...##.......#..#.......#..#...","#...........#.....#.....#.#...#.##.#","###..#....####..#.###...#....#..#...","##....#.#..#.#......##.......#....#.","..#.#....#.#.#..#...#.##.##..#......","...#.....#......#.#.#.##.....#..###.","..#.#.###.......#..#.#....##.....#..",".#.#.#...#..#.#..##.#..........#...#",".....#.#.#...#..#..#...###.#...#.#..","#..#..#.....#.##..##...##.#.....#...","....##....#.##...#..........#.##....","...#....###.#...##........##.##..##.","#..#....#......#......###...........","##...#..#.##.##..##....#..#..##..#.#",".#....#..##.....#.#............##...",".###.........#....#.##.#..#.#..#.#..","#...#..#...#.#.#.....#....#......###","#...........##.#....#.##......#.#..#","....#...#..#...#.####...#.#..#.##...","......####.....#..#....#....#....#.#",".##.#..###..####...#.......#.#....#.","#.###....#....#..........#.....###.#","...#......#....##...##..#..#...###..","..#...###.###.........#.#..#.#..#...",".#.#.............#.#....#...........","..#...#.###...##....##.#.#.#....#.#."]
let results = findBestAsteroids(getAllAsteroids(input))
console.info(results.max)

let startingPoint = results.asteroid

console.info(vaporize(getAllAsteroids(input), startingPoint))
