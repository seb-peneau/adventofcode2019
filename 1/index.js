
function getFuel (mass) {
  return Math.floor(mass / 3) - 2
}

function getFuelForAll (modules, method) {
  let result = 0;
  for (let i = 0; i < modules.length; i++) {
    result += method(modules[i])
  }
  return result
}

function getAdditionalFuel (mass) {
  let result = 0
  let m = getFuel(mass)
  result = m
  while (m >= 0) {
    m = getFuel(m)
    if (m > 0) result += m
  }
  return result
}

module.exports = {
  "getFuel": getFuel,
  "getFuelForAllModules": getFuelForAll,
  "getAdditionalFuel": getAdditionalFuel
}

const input = [149895,89996,98406,105129,81621,118239,76034,75248,145049,52137,137654,78153,92688,123037,61391,105590,96292,97343,106933,83151,60467,110976,133919,111869,119326,101284,68673,87159,111010,77874,113160,51401,138135,53885,140769,64373,148795,87103,50288,144316,67856,120288,95355,128460,84755,127690,85806,76292,57886,62479,78576,131616,130344,101320,68605,124509,103802,118230,129314,124777,80908,111895,82578,111454,138739,107566,140125,144627,121508,56419,112553,76470,57530,138587,134643,117339,88833,119183,82644,143335,110222,114309,132245,146443,113942,52574,116978,53635,125507,100058,133025,82765,52334,87317,105273,130353,89154,96997,83906,58085]
console.log(getFuelForAll(input, getFuel))
console.log(getFuelForAll(input, getAdditionalFuel))