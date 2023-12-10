import { inputDemo, input } from './input/day9.mjs';

console.time('init')
const inputArr = input.split('\n').map(line => line.split(' ').map(Number))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')

  const ans1 = inputArr.map(lineArr => {
    const record = [lineArr]
    while(true) {
      const newLine = record[record.length - 1].reduce((ret, num, idx, arr) => {
        if (idx === 0) {
          return []
        }
        ret.push(num - arr[idx-1])
        return ret
      }, [])
      record.push(newLine)

      if (record[record.length - 1].every(num => num === 0)) {
        break;
      }
    }

    let ret = 0
    for (let row=record.length-2; row>=0; row--) {
      const lineArr = record[row]
      ret += lineArr[lineArr.length-1]
    }
    return ret
  }).reduce((sum, num) => sum + num, 0)

  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  const ans2 = inputArr.map(lineArr => {
    const record = [lineArr]
    while(true) {
      const newLine = record[record.length - 1].reduce((ret, num, idx, arr) => {
        if (idx === 0) {
          return []
        }
        ret.push(num - arr[idx-1])
        return ret
      }, [])
      record.push(newLine)

      if (record[record.length - 1].every(num => num === 0)) {
        break;
      }
    }

    let ret = 0
    for (let row=record.length-2; row>=0; row--) {
      const lineArr = record[row]
      ret = lineArr[0] - ret
    }
    return ret
  }).reduce((sum, num) => sum + num, 0)

  console.log('part2 ans:', ans2)
  console.timeEnd('part2')
}

part2()