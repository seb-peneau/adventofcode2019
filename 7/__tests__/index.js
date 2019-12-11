const processOpCode = require("../index").processOpCode
const processProgram = require("../index").processProgram
const getMaxThruster = require("../index").getMaxThruster
const getThrusterForPhase = require("../index").getThrusterForPhase

const expect = require('chai').expect

describe('test suite for problem 5 of advent of code 2019', () => {

  it('should return correct action for input [1,0,0,0,99]', () => {
    let action = {"change":{"index": 0, "value":2}, "nextIndex": 4}
    let program = [1,0,0,0,99]
    expect(processOpCode(program, 0)).to.be.eql(action)
  })

  it('should return correct action for input [2,3,0,3,99]', () => {
    let action = {"change":{"index": 3, "value": 6}, "nextIndex": 4}
    let program = [2,3,0,3,99]
    expect(processOpCode(program, 0)).to.be.eql(action)
  })

  it('should return correct action for input [2,4,4,5,99,0]', () => {
    let action = {"change":{"index": 5, "value": 99*99}, "nextIndex": 4}
    let program = [2,4,4,5,99,0]
    expect(processOpCode(program, 0)).to.be.eql(action)    
  })

  it('should return correct action for input [3,2]', () => {
    let action = {"change":{"index": 2, "value": 10}, "nextIndex": 2}
    let program = [3,2,0,99]
    expect(processOpCode(program, 0, 10)).to.be.eql(action)        
  })

  it('should return an output for [3,1,4,2,99]', () => {
    let program = [3,1,4,1,99]
    expect(processProgram(program, 10).output).to.be.equal(10)  
  })

  it('should return [101,0,0,0,99] for input [101,0,0,0,99]', () => {
    let action = {"change":{"index": 0, "value": 101}, "nextIndex": 4}
    let program = [101,0,0,0,99]
    expect(processOpCode(program, 0, 10)).to.be.eql(action)       
  })

  it('should return [0,0,0,0,99] for input [1101,0,0,0,99]', () => {
    let action = {"change":{"index": 0, "value": 0}, "nextIndex": 4}
    let program = [1101,0,0,0,99]
    expect(processOpCode(program, 0, 10)).to.be.eql(action)       
  })

  it('should return [101,0,0,0,99] for input [1001,0,0,0,99]', () => {
    let action = {"change":{"index": 0, "value": 1001}, "nextIndex": 4}
    let program = [1001,0,0,0,99]
    expect(processOpCode(program, 0, 10)).to.be.eql(action)      
  })

  it('should return [101,0,0,0,99] for input [1101,100,-1,4,0]', () => {
    let action = {"change":{"index": 4, "value": 99}, "nextIndex": 4}
    let program = [1101,100,-1,4,0]
    expect(processOpCode(program, 0, 10)).to.be.eql(action)       
  })

  it('should correct output depending of inputvalue (1 for 8, 0 otherwise) for input [3,9,8,9,10,9,4,9,99,-1,8]', () => {
    expect(processProgram([3,9,8,9,10,9,4,9,99,-1,8], 0).output).to.be.equal(0)
    expect(processProgram([3,9,8,9,10,9,4,9,99,-1,8], 8).output).to.be.equal(1)
  })  
 
  it('should correct output depending of inputvalue (1 for 8, 0 otherwise) for input [3,3,1108,-1,8,3,4,3,99]', () => {
    expect(processProgram([3,3,1108,-1,8,3,4,3,99], 0).output).to.be.equal(0)
    expect(processProgram([3,3,1108,-1,8,3,4,3,99], 8).output).to.be.equal(1)
  })  

  it('should correct output depending of inputvalue (1 for < 8, 0 otherwise) for input [3,9,7,9,10,9,4,9,99,-1,8]', () => {
    expect(processProgram([3,9,7,9,10,9,4,9,99,-1,8], 0).output).to.be.equal(1)
    expect(processProgram([3,9,7,9,10,9,4,9,99,-1,8], 8).output).to.be.equal(0)
  })  

  it('should correct output depending of inputvalue (1 for < 8, 0 otherwise) for input [3,3,1107,-1,8,3,4,3,99]', () => {
    expect(processProgram([3,3,1107,-1,8,3,4,3,99], 0).output).to.be.equal(1)
    expect(processProgram([3,3,1107,-1,8,3,4,3,99], 8).output).to.be.equal(0)
  })  

  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) for input [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]', () => {
    let program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]
    expect(processProgram(program, 0).output).to.be.equal(0)
    program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]
    expect(processProgram(program, 8).output).to.be.equal(1)
  }) 

  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) for input [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]', () => {
    let program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
    expect(processProgram(program, 0).output).to.be.equal(0)
    program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
    expect(processProgram(program, 9).output).to.be.equal(1)
  })   


  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) with a ig sample', () => {
    let program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 0).output).to.be.equal(999)
    program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 8).output).to.be.equal(1000)
    program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 9).output).to.be.equal(1001)
  })

  it('should manage several inputs for [3,1,3,1,4,1,99]', () => {
    let program = [3,1,3,1,4,1,99]
    expect(processProgram(program, [10, 12]).output).to.be.equal(12)
  })

  
  it('should get max thruster signal for [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]', () => {
    let program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]
    expect(getMaxThruster(program, 0, [0,1,2,3,4])).to.be.equal(43210)  
  })
  
  it('should get max thruster signal for [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]', () => {
    let program = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]
    expect(getMaxThruster(program, 0, [0,1,2,3,4])).to.be.equal(54321)  
  })

  it('should get max thruster signal for [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]', () => {
    let program = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]
    expect(getMaxThruster(program, 0, [0,1,2,3,4])).to.be.equal(65210)  
  })

  it('should get max thruster signal for [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]', () => {
    let program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
    expect(getThrusterForPhase(program, 0, [9,8,7,6,5])).to.be.equal(139629729)  
  })
})