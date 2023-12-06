import { inputDemo, input } from './input/day6.mjs'

const [time, distance] = input.split('\n').map(lint => lint.split(' ').map(Number).filter(n => n > 0))

console.time('ans1')
let ans1 = 1
for (let i = 0; i < time.length; i++) {
  const t = time[i]
  const d = distance[i]

  let count = 0
  for (let j = 0; j < t; j++) {
    const reminderTime = t - j;
    const allDistance = j * reminderTime
    if (allDistance > d) {
      count++
    }
  }
  ans1 *= count
}

console.timeLog('ans1', ans1)


const newTime = +time.reduce((ret, cur) => `${ret}${cur}`, '')
const newDistance = +distance.reduce((ret, cur) => `${ret}${cur}`, '')


console.time('ans2')
let ans2 = 0

let start = -1, end = -1
while(start < 0 || end < 0) {
  for (let j = 0; j < newTime; j++) {
    if (start < 0 && j * (newTime - j) > newDistance) {
      start = j
    }
    if (end < 0 && (newTime - j) * j > newDistance) {
      end = newTime - j
    }

    if (start >= 0 && end >= 0) {
      break
    }
  }
  
  if (start && end) {
    ans2 = end - start + 1
  }
}


console.timeLog('ans2', ans2)