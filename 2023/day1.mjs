import { input } from "./input/day1.mjs"

const ans1 = input.split('\n').map(line => {
  const nums = line.match(/\d/g)
  return +[nums[0], nums[nums.length - 1]].join('')
}).reduce((sum, num) => sum + num, 0)

console.log('ans1',ans1)


const mapping = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  // 'zero': 0
}

const keys = Object.keys(mapping)
const ans2 = input.split('\n').map((line, idx) => {
  const arr = []

  line.split('').forEach((char, idx) => {
    if (/\d/.test(char)) {
      arr.push({
        idx,
        key: char
      })
      return
    }

    const matched = line.slice(idx).match(/one|two|three|four|five|six|seven|eight|nine/)
    if (matched && matched.index === 0) {
      arr.push({
        idx,
        key: matched[0],
      })
    }
  })

  const nums = arr.sort((a, b) => a.idx - b.idx).map(o => Number.isNaN(+o.key) ? mapping[o.key] : +o.key)
  return +[nums[0], nums[nums.length - 1]].join('')
}).reduce((sum, num) => (sum + num), 0)

console.log('ans2', ans2)