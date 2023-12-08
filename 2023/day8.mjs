import { input, inputDemo1, inputDemo2, inputDemo3 } from './input/day8.mjs'

console.time('init')
const inputArr = input.split('\n').map(line => line.split('=').map((x, idx) => {
  return idx === 0 ? x.trim() : x.split(',').map(y => y.replace(/\(|\)/g, '').trim())
}))
const [[instructions], _2, ...mapArr] = inputArr
const mapping = mapArr.reduce((obj, item) => {
  obj[item[0]] = item[1]
  return obj
}, {})

console.timeEnd('init')

function part1() {
  console.time('part1')

  let current = 'AAA'
  let step = 0
  while (current !== 'ZZZ') {
    const instruction = instructions[step % instructions.length]
    step++
    switch (instruction) {
      case 'L':
        current = mapping[current][0]
        break
      case 'R':
        current = mapping[current][1]
        break
    }
  }


  console.log('part1 ans:', step)
  console.timeEnd('part1')
}

// part1()

function part2() {
  console.time('part2')

  let currentArr = mapArr.map(item => item[0]).filter(str => str[2] === 'A')
  let step = 0
  let record = Array(6).fill('')
  while (record.filter(Boolean).length < currentArr.length) {
    // console.log(currentArr)
    const instruction = instructions[step % instructions.length]
    step++
    switch (instruction) {
      case 'L':
        currentArr = currentArr.map((str, idx) => {
          const newStr = mapping[str][0]
          if (newStr[2] === 'Z' && !record[idx]) {
            record[idx] = step
          }
          return newStr
        })
        break
      case 'R':
        currentArr = currentArr.map((str, idx) => {
          const newStr = mapping[str][1]
          if (newStr[2] === 'Z' && !record[idx]) {
            record[idx] = step
          }
          return newStr
        })
        break
    }
  }

  // console.log(record)
  const gcd = (a, b) => a ? gcd(b % a, a) : b;
  const lcm = (a, b) => a * b / gcd(a, b);
  console.log('part2 ans:', record.reduce(lcm, 1))
  console.timeEnd('part2')
}

part2()