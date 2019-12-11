
function processOpCode (program, index, inputValue) {
  let op = program[index]
  let pVal1 = program[index + 1]
  let pVal2 = program[index + 2]
  let pVal3 = program[index + 3]
  let val1 = program[pVal1]
  let val2 = program[pVal2]

  let nextIndex = -1
  let changeIndex = -1
  let changeValue = 0

  let opS = op.toString()

  if (opS.length == 1 || opS.lenght == 2) { // 02 or 2
    op = parseInt(opS)
  } else if (opS.length == 3) { // 102
    op = parseInt(opS[1] + opS[2])
    val1 = (parseInt(opS[0]) == 0) ? program[pVal1] : pVal1
  } else if (opS.length == 4) { // 1002
    op = parseInt(opS[2] + opS[3])
    val1 = (parseInt(opS[1]) == 0) ? program[pVal1] : pVal1
    val2 = (parseInt(opS[0]) == 0) ? program[pVal2] : pVal2
  }

  if (op == 3) {
    nextIndex = index + 2
  }  else  if (op == 5) {
    if (val1 != 0) {
      nextIndex = val2
    } else {
      nextIndex = index + 3
    }
  } else  if (op == 6) {
    if (val1 == 0) {
      nextIndex = val2
    } else {
      nextIndex = index + 3
    }
  } else {
    nextIndex = index + 4
  }

  if (op == 1) { // addition
    changeIndex = pVal3
    changeValue = val1 + val2
  }
  if (op == 2) { //multiplication
    changeIndex = pVal3
    changeValue = val1 * val2
  }
  if (op == 3) { // store input value
    changeIndex = pVal1
    changeValue = inputValue
  }

  if (op == 8) {
    changeIndex = pVal3
    changeValue = (val1 == val2) ? 1 : 0
  }
  if (op == 7) {
    changeIndex = pVal3
    changeValue = (val1 < val2) ? 1 : 0
  }
  return {"nextIndex": nextIndex, "change": {"index": changeIndex, "value": changeValue}}
}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if(!rest.length) {
      ret.push([xs[i]])
    } else {
      for(let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}

function processProgram (program, input, startIndex) {
  let res = {"code": -1, "startIndex": startIndex}
  let stop = false
  let output = []
  while (res.code != 99  && stop == false) {
    res = _processProgram(program, input.shift(), startIndex)
    if (res.output) output.push(res.output)
    startIndex = res.startIndex
    if (res.code == 3 && input.length == 0) {
      stop = true
    }
  }
  res.output = output
  return res
}

function _processProgram (program, input, startIndex) {
  let index = startIndex > 0 ? startIndex : 0
  let firstOp = program[index]
  let output = ""
  let stop = (firstOp == 3 && input == 9999) ? true : false
  while (firstOp != 99 && stop != true) {
    if (firstOp == 4 || firstOp == 104) { //program will not change
      output += (firstOp == 104) ? program[index + 1] : program[program[index + 1]]
      index = index + 2 
    } else { // program will change
      let action = processOpCode(program, index, input)
      if (action.change && action.change.index != -1) {
        program[action.change.index] = action.change.value
      }
      index = action.nextIndex
    }
    firstOp = program[index]
    if (firstOp == 3) {
      stop = true
    }
  }
  var res = {
    "output": parseInt(output),
    "code": firstOp,
    "startIndex": index
  }
  return res
}

function getMaxThruster (program, firstValue, ph) {
  let phases = perm(ph)
  let maxVal = firstValue
  let _p = [...program]
  maxVal = 0
  phases.forEach(x => {
    let val = firstValue
    let res = {"output": null}
    x.forEach(y => {
      res = processProgram(_p, [y, val])
      val = res.output
    })
    maxVal = Math.max(maxVal, val)
    _p = [...program]
  })
  return maxVal
}

function getMaxThrusterForPhase (program, firstValue, ph) {
  let phases = perm(ph)
  let maxVal = firstValue
  let _p = [...program]
  maxVal = 0
  phases.forEach(x => {
    maxVal = Math.max(maxVal, getThrusterForPhase(_p, firstValue, x))
  })
  return maxVal
}

function getThrusterForPhase (program, firstValue, ph) {
  let val = firstValue
  let res = {"output": null, "startIndex": 0, "code": -1}
  let programSofts = [ 
    {"program": [...program], "startIndex": 0, "input": []},
    {"program": [...program], "startIndex": 0, "input": []}, 
    {"program": [...program], "startIndex": 0, "input": []},
    {"program": [...program], "startIndex": 0, "input": []},
    {"program": [...program], "startIndex": 0, "input": []} ]
  
  let code = -1
  let currentMachine = 0
  ph.forEach((y, index) => {
    programSofts[index].input.push(y)
  })
  programSofts[currentMachine].input.push(firstValue)
  while (code != 99) {
    res = processProgram(programSofts[currentMachine].program, programSofts[currentMachine].input, programSofts[currentMachine].startIndex)
    programSofts[currentMachine].startIndex = res.startIndex
    if (currentMachine == programSofts.length - 1) {
      code = res.code
    }    
    currentMachine = (currentMachine + 1) % programSofts.length
    if (res.output.length > 0) {
      programSofts[currentMachine].input = programSofts[currentMachine].input.concat(res.output)
    }
  }
  val = res.output[0]
  return val
}



module.exports = {
  "processOpCode": processOpCode,
  "processProgram": processProgram,
  "getMaxThruster": getMaxThruster,
  "getThrusterForPhase": getThrusterForPhase
}

let input = [3,8,1001,8,10,8,105,1,0,0,21,38,55,72,93,118,199,280,361,442,99999,3,9,1001,9,2,9,1002,9,5,9,101,4,9,9,4,9,99,3,9,1002,9,3,9,1001,9,5,9,1002,9,4,9,4,9,99,3,9,101,4,9,9,1002,9,3,9,1001,9,4,9,4,9,99,3,9,1002,9,4,9,1001,9,4,9,102,5,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,1002,9,3,9,1001,9,3,9,102,5,9,9,101,4,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99]
console.log(getMaxThruster(input, 0, [0,1,2,3,4]))

input = [3,8,1001,8,10,8,105,1,0,0,21,38,55,72,93,118,199,280,361,442,99999,3,9,1001,9,2,9,1002,9,5,9,101,4,9,9,4,9,99,3,9,1002,9,3,9,1001,9,5,9,1002,9,4,9,4,9,99,3,9,101,4,9,9,1002,9,3,9,1001,9,4,9,4,9,99,3,9,1002,9,4,9,1001,9,4,9,102,5,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,1002,9,3,9,1001,9,3,9,102,5,9,9,101,4,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99]
console.log(getMaxThrusterForPhase(input, 0, [9,8,7,6,5]))
