
function isCorrectLength (number) {
  return number.toString().length == 6
}

function hasSameAdjacent (number) {
  let input = number.toString()
  let mapInput = input.split("")
  mapInput = mapInput.map(x => {
    let adjNumber  = x+x
    return input.indexOf(adjNumber)
  })
  let max = Math.max(...mapInput)
  return max > -1
}

function neverDecrease (number) {
  let input = number.toString()
  let mapInput = input.split("")
  mapInput = mapInput.map((x, index, mI) => {
    if (index > 0) {
      let previous = parseInt(mI[index-1])
      return parseInt(x) >= previous
    } else {
      return true
    }
  })
  return mapInput.indexOf(false) == -1
}

function countFitAll (input) {
  input = input.filter(x => {
    return (isCorrectLength(x) && hasSameAdjacent(x) && neverDecrease(x))
  })
  return input.length
}

function getRange (start, end) {
  let range = []
  for (var i = start; i <= end; i++) {
    range.push(i)
  }
  return range
}

function notInLargerGroup (number) {
  let input = number.toString()
  let mapInput = input.split("")
  mapInput = mapInput.filter((x, index, mI) => {
    return mI.filter(y => y == x).length == 2
  })
  return mapInput.length > 0
}

function countFitAllPart2 (input) {
  input = input
    .filter(x => isCorrectLength(x))
    .filter(x => hasSameAdjacent(x))
    .filter(x => neverDecrease(x))
    .filter(x => notInLargerGroup(x))
  return input.length
}

module.exports = {
  "isCorrectLength": isCorrectLength,
  "hasSameAdjacent": hasSameAdjacent,
  "neverDecrease": neverDecrease,
  "countFitAll": countFitAll,
  "notInLargerGroup": notInLargerGroup,
  "countFitAllPart2": countFitAllPart2
}

console.log(countFitAll(getRange(372304, 847060)))
console.log(countFitAllPart2(getRange(372304, 847060)))