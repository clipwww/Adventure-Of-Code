import { inputDemo, input } from './input/day18.mjs';

console.time('init')
const inputArr = inputDemo.split('\n').map(line => line.split(' '))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')

  let arr = [['#']]
  let pos = [0, 0]
  inputArr.forEach(line => {
    let [direct, num, color] = line
    num = +num
    switch (direct) {
      case 'R':
  
        Array(num).fill('').forEach((_, idx) => {
          pos[0]++
          arr[pos[1]][pos[0]] = '#'
        })
        break
      case 'L':
        Array(num).fill('').forEach((_, idx) => {
          pos[0]--
          arr[pos[1]][pos[0]] = '#'
        })
        break
      case 'U':
        Array(num).fill('').forEach((_, idx) => {
          pos[1]--
          if (!arr[pos[1]]) {
            arr[pos[1]] = []
          }
          arr[pos[1]][pos[0]] = '#'
        })
        break
      case 'D':
        Array(num).fill('').forEach((_, idx) => {
          pos[1]++
          if (!arr[pos[1]]) {
            arr[pos[1]] = []
          }
          arr[pos[1]][pos[0]] = '#'
        })
        break
    }
  })

  const ans1 = arr.map(lineArr => {
    let tempArr = []
    lineArr.forEach((char, idx) => {
      if (char === '#') {
        tempArr.push(idx)
      }
    })
    console.log(tempArr)
    let count = 0
    for(let i=0; i<tempArr.length; i+=2) {
      const sIdx = tempArr[i]
      const eIdx = tempArr[i+1]
      if (eIdx) {
        count += (eIdx - sIdx + 1)
      } else {
        count ++
      }
    }
    return count
  })
  
  // .reduce((sum, cur) => sum + cur, 0)

  console.log('part1 ans:',  ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  console.log('part2 ans:', '')
  console.timeEnd('part2')
}

part2()