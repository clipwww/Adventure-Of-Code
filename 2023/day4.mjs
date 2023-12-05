import { input } from "./input/day4.mjs"


const ans1 = input.split('\n').map(line => {
  const [_, cards] = line.split(': ')
  const [card1, card2] = cards.split('|')
  const card1Arr = card1.split(' ').map(num => +num).filter(num => num > 0)
  const matchCount = card2.split(' ').filter(num => card1Arr.includes(+num)).length
  return matchCount > 0 ? Math.pow(2, matchCount - 1) : 0
}).reduce((sum, cur) => sum + cur, 0)

console.log('ans1', ans1)

const atari = new Map()
input.split('\n').forEach((line, idx, arr) => {
  const [_, cards] = line.split(': ')
  const [card1, card2] = cards.split('|')
  const card1Arr = card1.split(' ').map(num => +num).filter(num => num > 0)
  const matchCount = card2.split(' ').filter(num => card1Arr.includes(+num)).length
  const newCount = (atari.get(idx) || 0) + 1
  if (matchCount <= 0) {
    atari.set(idx, newCount)
    return
  }

  atari.set(idx, newCount)
  for(let i=idx+1; i<idx+1+matchCount; i++) {
    if (i >= arr.length) {
      break
    }
    atari.set(i, (atari.get(i) || 0) + newCount)
  }
})

const ans2 = Array.from(atari).reduce((sum, [idx, cardCount]) => sum + cardCount, 0)

console.log('ans2', ans2)