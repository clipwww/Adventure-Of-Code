import { inputDemo, input } from './input/day7.mjs';


const inputArr = (false ? inputDemo : input).split('\n').map(line => line.split(' '))

console.time('ans1')
const point = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const pointMap = new Map()
function getPoints(cards) {
  if (pointMap.has(cards)) {
    return pointMap.get(cards)
  }

  const size = new Set(cards.split('')).size
  if (size === 1) {
    const point = 6
    pointMap.set(cards, point)
    return point
  }

  if (size === 4) {
    const point = 1
    pointMap.set(cards, point)
    return point
  }

  if (size === 5) {
    const point = 0
    pointMap.set(cards, point)
    return point
  }
  

  const map = new Map()
  for(let i=0; i<cards.length; i++) {
    const card = cards[i]
    map.set(card, (map.get(card) || 0) + 1)
  }
  
  const arr = Array.from(map)
  if (size === 2) {
    const point = arr.some(([_, count]) => count === 4) ? 5 : 4
    pointMap.set(cards, point)
    return point 
  }

  const point = arr.some(([_, count]) => count === 3) ? 3 : 2
  pointMap.set(cards, point)
  return point 
}

const ans1 = inputArr.sort((a, b) => {
  const [aCards] = a
  const [bCards] = b

  const aPoint = getPoints(aCards)
  const bPoint = getPoints(bCards)

  // console.log(aCards, bCards, aPoint, bPoint)
  if (aPoint !== bPoint) {
    return aPoint > bPoint ? 1 : -1
  }

  let i=0;
  while(aCards[i] === bCards[i]) {
    i++
  }
  const aPoint2 = point.indexOf(aCards[i])
  const bPoint2 = point.indexOf(bCards[i])

  
  return aPoint2 > bPoint2 ? 1 : -1
}).reduce((sum, cur, idx) => sum += (cur[1] * (idx+1)), 0)

console.timeLog('ans1', ans1)


console.time('ans2')
const point2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const pointMap2 = new Map()
function getPoints2(originCards) {
  let cards = originCards
  if (pointMap2.has(originCards)) {
    return pointMap2.get(originCards)
  }

  let map = new Map()
  for(let i=0; i<cards.length; i++) {
    const card = cards[i]
    map.set(card, (map.get(card) || 0) + 1)
  }
  let arr = Array.from(map)

  /** 含 J */
  if (cards.includes('J')) {
    const sortCards = arr.sort((a, b) => {
      if (a[1] === b[1]) {
        return point2.indexOf(a[0]) > point2.indexOf(b[0]) ? -1 : 1
      }
      
      return a[1] > b[1] ? -1 : 1
    }, ['', 0])
    /** 尋找數量最多的卡 */
    let targetCard = sortCards[0][0]
    /** 如果那個是 J 就找次多 */
    if (targetCard === 'J') {
      /** 沒有次多就全部換成 A */
      targetCard = sortCards[1]?.[0] || point2[point2.length - 1]
    }
    cards = cards.replace(/J/g, targetCard)
  }

  const size = new Set(cards.split('')).size
  if (size === 1) {
    const point = 6
    pointMap2.set(originCards, point)
    return point
  }

  if (size === 4) {
    const point = 1
    pointMap2.set(originCards, point)
    return point
  }

  if (size === 5) {
    const point = 0
    pointMap2.set(originCards, point)
    return point
  }
  
  map = new Map()
  for(let i=0; i<cards.length; i++) {
    const card = cards[i]
    map.set(card, (map.get(card) || 0) + 1)
  }
  arr = Array.from(map)
  if (size === 2) {
    const point = arr.some(([_, count]) => count === 4) ? 5 : 4
    pointMap2.set(originCards, point)
    return point 
  }

  const point = arr.some(([_, count]) => count === 3) ? 3 : 2
  pointMap2.set(originCards, point)
  return point 
}

const ans2 = inputArr.sort((a, b) => {
  const [aCards] = a
  const [bCards] = b

  const aPoint = getPoints2(aCards)
  const bPoint = getPoints2(bCards)

  // console.log(aCards, bCards, aPoint, bPoint)
  if (aPoint !== bPoint) {
    return aPoint > bPoint ? 1 : -1
  }

  let i=0;
  while(aCards[i] === bCards[i]) {
    i++
  }
  const aPoint2 = point2.indexOf(aCards[i])
  const bPoint2 = point2.indexOf(bCards[i])

  
  return aPoint2 > bPoint2 ? 1 : -1
}).reduce((sum, cur, idx) => sum += (cur[1] * (idx+1)), 0)

console.timeLog('ans2', ans2)