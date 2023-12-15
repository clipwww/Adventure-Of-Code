import { inputDemo, input } from './input/day15.mjs';

console.time('init')
const inputArr = input.split(',').map(s => s.split(''))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')

  const ans1 = inputArr.map(sequence => sequence.reduce((num, str) => (num + str.charCodeAt()) * 17 % 256, 0))
            .reduce((sum, cur) => sum + cur, 0)

  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  let box = []
  inputArr.forEach(sequence => {
    if (sequence.includes('=')) {
      const idx = sequence.indexOf('=')
      const focal = +sequence.slice(idx + 1)
      const target = sequence.slice(0, idx).join('')
      const boxIdx = sequence.slice(0, idx).reduce((num, str) => (num + str.charCodeAt()) * 17 % 256, 0)
      if (box[boxIdx]) {
        const index = box[boxIdx].findIndex(([key]) => key === target)
        if (index < 0) {
          box[boxIdx].push([target, focal])
        } else {
          box[boxIdx][index][1] = focal
        }
      } else {
        box[boxIdx] = [[target, focal]]
      }
    }

    if (sequence.includes('-')) {
      const idx = sequence.indexOf('-')
      const focal = +sequence.slice(idx + 1)
      const target = sequence.slice(0, idx).join('')
      box = box.map(arr => {
        const index = arr.findIndex(([key]) => key === target)
        if (index < 0) {
          return arr
        }
        arr.splice(index, 1)
        return arr
      })
    }
  })

  const ans2 = box
  .map((arr, boxIdx) => arr.map(([_, focal], idx) => (boxIdx+1) * (idx+1) * focal).reduce((sum, cur) => sum + cur, 0))
  .reduce((sum, cur) => sum + cur, 0)
  console.log('part2 ans:', ans2)
  console.timeEnd('part2')
}

part2()