import { inputDemo, input } from './input/day11.mjs';

console.time('init')
const inputArr = input.split('\n').map(line => line.split(''))
console.timeEnd('init')
// console.log(inputArr)

function getAns(offset = 1) {
  let rowIdx = Array(inputArr.length).fill('').map((_, idx) => idx)
  let colIdx = Array(inputArr[0].length).fill('').map((_, idx) => idx)
  let galaxies = []
  for(let row=0;row<inputArr.length; row++) {
    const line = inputArr[row]

    for(let col=0; col<line.length; col++) {
      const str = line[col]
      if (str === '#') {
        rowIdx[row] = -1
        colIdx[col] = -1
        galaxies.push([row, col])
      }
    }
  }
  rowIdx = rowIdx.filter(idx => idx >= 0)
  colIdx = colIdx.filter(idx => idx >= 0)

  let ans = galaxies.map((pos1, idx, arr) => {
    return arr.slice(idx + 1).map(pos2 => {
      const step = Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
      const minRow = Math.min(pos1[0], pos2[0])
      const minCol = Math.min(pos1[1], pos2[1])
      const maxRow = Math.max(pos1[0], pos2[0])
      const maxCol = Math.max(pos1[1], pos2[1])
      const extend = rowIdx.filter(idx => idx > minRow && idx < maxRow).length + colIdx.filter(idx => idx > minCol && idx < maxCol).length
      return step + (extend * offset)
    }).reduce((sum, cur) => sum + cur, 0)
  }).reduce((sum, cur) => sum + cur, 0)

  return ans
}

function part1() {
  console.time('part1')

  const ans1 = getAns()
  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  const ans2 = getAns(1000000 - 1)
  console.log('part2 ans:', ans2)
  console.timeEnd('part2')
}

part2()