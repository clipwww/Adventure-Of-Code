import { inputDemo, input } from './input/day14.mjs';

console.time('init')
const inputArr = input.split('\n').map(line => line.split(''))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')

  let newArr = Array(inputArr.length).fill('').map(() => [])
  for(let col=0; col<inputArr[0].length; col++) {
    let roundRocksIdx = []
    let cubeRocksIdx = []
    for(let row=0;row<inputArr.length;row++) {
      if (inputArr[row][col] === '#') {
        cubeRocksIdx.push(row)
      }
      if (inputArr[row][col] === 'O') {
        roundRocksIdx.push(row)
      }
    }

    let nIdx = 0
    let cIdx = cubeRocksIdx.shift() ?? Infinity
    roundRocksIdx.forEach(rIdx => {
      // console.log(rIdx, cIdx)
      if (rIdx < cIdx) {
        newArr[nIdx][col] = 'O'
        nIdx++
        return
      }

      while(rIdx > cIdx) {
        nIdx = cIdx + 1
        cIdx = cubeRocksIdx.shift() ?? Infinity
      }
      newArr[nIdx][col] = 'O'
      nIdx++
    })

  }

  const ans1 = newArr.map((line, rIdx) => line.filter(Boolean).length * (newArr.length - rIdx)).reduce((sum, cur) => sum + cur, 0)

  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  console.log('part2 ans:', '')
  console.timeEnd('part2')
}

part2()