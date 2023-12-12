import { inputDemo, inputDemo2, input } from './input/day10.mjs';

console.time('init')
let currentPos = []
const inputArr = input.split('\n').map((line, idx) => {
  if (line.includes('S')) {
    currentPos = [idx, line.indexOf('S')]
  }
  return line.split('')
})

function getMap(pre) {
  switch (pre) {
    case 'north':
      return { '|': 'north', '7': 'west', 'F': 'east' }
    case 'south':
      return { '|': 'south', 'J': 'west', 'L': 'east' }
    case 'east':
      return { '-': 'east', 'J': 'north', '7': 'south' }
    case 'west':
      return { '-': 'west', 'L': 'north', 'F': 'south' }
  }
}

function getPipePos(x, y) {
  const findList = [
    [-1, 0, '|7F', getMap('north')],
    [1, 0, '|LJ', getMap('south')],
    [0, 1, '-J7', getMap('east')],
    [0, -1, '-LF', getMap('west')]
  ]

  const pos = findList.find(([offsetY, offsetX, target]) => {
    return target.includes(inputArr?.[y + offsetY]?.[x + offsetX])
  })

  return [y + pos[0], x + pos[1], pos[3]]
}

console.timeEnd('init')

function part1() {
  console.time('part1')

  const [newY, newX, map] = getPipePos(currentPos[1], currentPos[0])
  currentPos = [newY, newX]
  let current = inputArr[newY][newX]
  let instruction = map[current]
  let step = 1
  while (current !== 'S') {
    switch (instruction) {
      case 'north':
        currentPos = [currentPos[0] - 1, currentPos[1]]
        break
      case 'south':
        currentPos = [currentPos[0] + 1, currentPos[1]]
        break
      case 'east':
        currentPos = [currentPos[0], currentPos[1] + 1]
        break
      case 'west':
        currentPos = [currentPos[0], currentPos[1] - 1]
        break
    }

    current = inputArr[currentPos[0]][currentPos[1]]
    instruction = getMap(instruction)[current]
    step++
  }

  console.log('part1 ans:', step / 2)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  const [newY, newX, map] = getPipePos(currentPos[1], currentPos[0])
  currentPos = [newY, newX]
  let current = inputArr[newY][newX]
  let preInstruction = 'S'
  let instruction = map[current]
  let newArr = JSON.parse(JSON.stringify(inputArr))
  while (current !== 'S') {

    switch (preInstruction) {
      case 'north':
        newArr[currentPos[0]][currentPos[1]] = 'up'
        break
      case 'south':
        newArr[currentPos[0]][currentPos[1]] = 'down'
        break
      case 'east':
        switch (instruction) {
          case 'north':
            newArr[currentPos[0]][currentPos[1]] = 'up'
            break
          case 'south':
            newArr[currentPos[0]][currentPos[1]] = 'down'
            break
          default:
            newArr[currentPos[0]][currentPos[1]] = '!'
            break
        }
        break
      case 'west':
        switch (instruction) {
          case 'north':
            newArr[currentPos[0]][currentPos[1]] = 'up'
            break
          case 'south':
            newArr[currentPos[0]][currentPos[1]] = 'down'
            break
          default:
            newArr[currentPos[0]][currentPos[1]] = '!'
            break
        }
        break
      case 'S':
        switch (instruction) {
          case 'north':
            newArr[currentPos[0]][currentPos[1]] = 'up'
            break
          case 'south':
            newArr[currentPos[0]][currentPos[1]] = 'down'
            break
        }
    }

    switch (instruction) {
      case 'north':
        currentPos = [currentPos[0] - 1, currentPos[1]]
        break
      case 'south':
        currentPos = [currentPos[0] + 1, currentPos[1]]
        break
      case 'east':
        currentPos = [currentPos[0], currentPos[1] + 1]
        break
      case 'west':
        currentPos = [currentPos[0], currentPos[1] - 1]
        break
    }

    current = inputArr[currentPos[0]][currentPos[1]]
    preInstruction = instruction
    instruction = getMap(preInstruction)[current]
  }

  let count = 0
  newArr.forEach((lineArr, rowIdx) => {
    let downIdx = -1
    let upIdx = -1
    lineArr.forEach((str, idx) => {
      if (str === 'down') {
        downIdx = idx
      }
      if (str === 'up') {
        upIdx = idx
      }

      if (upIdx >= 0 && downIdx >= 0) {

        if (lineArr[idx - 1] !== '!') {
          count += (Math.abs(upIdx - downIdx) - 1)
          // if ((Math.abs(upIdx - downIdx) - 1) > 0) {
          //   console.log(rowIdx, upIdx, downIdx)
          // }
        }
        upIdx = -1
        downIdx = -1
      }
    })
  })

  // console.log(newArr)
  console.log('part2 ans:', count)
  console.timeEnd('part2')
}

part2()