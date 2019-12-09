const processOpCode = require("../index").processOpCode
const processProgram = require("../index").processProgram

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
    expect(processProgram(program, 10)).to.be.equal(10)  
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
    expect(processProgram([3,9,8,9,10,9,4,9,99,-1,8], 0)).to.be.equal(0)
    expect(processProgram([3,9,8,9,10,9,4,9,99,-1,8], 8)).to.be.equal(1)
  })  
 
  it('should correct output depending of inputvalue (1 for 8, 0 otherwise) for input [3,3,1108,-1,8,3,4,3,99]', () => {
    expect(processProgram([3,3,1108,-1,8,3,4,3,99], 0)).to.be.equal(0)
    expect(processProgram([3,3,1108,-1,8,3,4,3,99], 8)).to.be.equal(1)
  })  

  it('should correct output depending of inputvalue (1 for < 8, 0 otherwise) for input [3,9,7,9,10,9,4,9,99,-1,8]', () => {
    expect(processProgram([3,9,7,9,10,9,4,9,99,-1,8], 0)).to.be.equal(1)
    expect(processProgram([3,9,7,9,10,9,4,9,99,-1,8], 8)).to.be.equal(0)
  })  

  it('should correct output depending of inputvalue (1 for < 8, 0 otherwise) for input [3,3,1107,-1,8,3,4,3,99]', () => {
    expect(processProgram([3,3,1107,-1,8,3,4,3,99], 0)).to.be.equal(1)
    expect(processProgram([3,3,1107,-1,8,3,4,3,99], 8)).to.be.equal(0)
  })  

  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) for input [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]', () => {
    let program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]
    expect(processProgram(program, 0)).to.be.equal(0)
    program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]
    expect(processProgram(program, 8)).to.be.equal(1)
  }) 

  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) for input [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]', () => {
    let program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
    expect(processProgram(program, 0)).to.be.equal(0)
    program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
    expect(processProgram(program, 9)).to.be.equal(1)
  })   


  it('should correct output depending of inputvalue (0 for 0, 1 otherwise) with a ig sample', () => {
    let program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 0)).to.be.equal(999)
    program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 8)).to.be.equal(1000)
    program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]
    expect(processProgram(program, 9)).to.be.equal(1001)
  })     
})