
function processOpCode (opCode, program) {
  let op = opCode[0]
  let val1 = program[opCode[1]]
  let val2 = program[opCode[2]]
  if (op == 1) { // addition
    program[opCode[3]] = val1 + val2
  }
  if (op == 2) { //multiplication
    program[opCode[3]] = val1 * val2
  }
  return program
}

function processProgram (program) {
  let index = 0
  let firstOp = program[index]
  while (firstOp != 99) {
    program = processOpCode(program.slice(index, index+4), program)
    index = index+4
    firstOp = program[index]
  }
  return program
}

function findNounVerb (input, value) {
  for (var i = 0; i <=99; i++) {
    for (var j = 0; j <=99; j++) {
      let program = [...input]
      program[1] = i
      program[2] = j
      program = processProgram(program)
      if (program[0] == value) {
        return [i, j]
      }
    } 
  }
}


module.exports = {
  "processOpCode": processOpCode,
  "processProgram": processProgram,
  "findNounVerb": findNounVerb
}

const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,2,9,19,23,1,9,23,27,2,27,9,31,1,31,5,35,2,35,9,39,1,39,10,43,2,43,13,47,1,47,6,51,2,51,10,55,1,9,55,59,2,6,59,63,1,63,6,67,1,67,10,71,1,71,10,75,2,9,75,79,1,5,79,83,2,9,83,87,1,87,9,91,2,91,13,95,1,95,9,99,1,99,6,103,2,103,6,107,1,107,5,111,1,13,111,115,2,115,6,119,1,119,5,123,1,2,123,127,1,6,127,0,99,2,14,0,0]
input[1] = 12
input[2] = 2
console.log(processProgram(input)[0])
const input2 = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,2,9,19,23,1,9,23,27,2,27,9,31,1,31,5,35,2,35,9,39,1,39,10,43,2,43,13,47,1,47,6,51,2,51,10,55,1,9,55,59,2,6,59,63,1,63,6,67,1,67,10,71,1,71,10,75,2,9,75,79,1,5,79,83,2,9,83,87,1,87,9,91,2,91,13,95,1,95,9,99,1,99,6,103,2,103,6,107,1,107,5,111,1,13,111,115,2,115,6,119,1,119,5,123,1,2,123,127,1,6,127,0,99,2,14,0,0]
let pair = findNounVerb(input2, 19690720)
console.log(100 * pair[0] + pair[1])