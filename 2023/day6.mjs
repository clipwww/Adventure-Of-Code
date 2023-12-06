import { inputDemo, input } from './input/day6.mjs'

const [time, distance] = input.split('\n').map(lint => lint.split(' ').map(Number).filter(n => n > 0))
console.log(time, distance)

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
console.log(newTime, newDistance)


console.time('ans2')
let ans2 = 0
for (let j = 0; j < newTime; j++) {
  const reminderTime = newTime - j;
  const allDistance = j * reminderTime
  if (allDistance > newDistance) {
    ans2++
  }
}

console.timeLog('ans2', ans2)