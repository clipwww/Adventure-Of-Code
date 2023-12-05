import { input } from "./input/day3.mjs"


let ans1Arr = []
const arr = input.split('\n').map(line => line.split(''))
for(let i=0; i<arr.length; i++) {
  const row = arr[i]
  let temp = ''
  let state = false
  for(let j=0; j<row.length; j++) {
    const s = arr[i][j]
    if (/\D/.test(s)) {
      continue
    }
    temp += s
    
    const checkList = [
      arr[i-1]?.[j-1],
      arr[i-1]?.[j],
      arr[i-1]?.[j+1],
      arr[i]?.[j-1],
      arr[i]?.[j+1],
      arr[i+1]?.[j-1],
      arr[i+1]?.[j],
      arr[i+1]?.[j+1],
    ]

    if (checkList.filter(s2 => !!s2).some(s2 => /\D/.test(s2) && s2 !== '.')) {
      state = true
    }
    
    if ((j+1 === row.length || /\D/.test(arr[i][j+1]))) {
      if (temp.length && state) {
        ans1Arr.push(+temp)
      }
      temp = ''
      state = false
    }
  }
}

const ans1 = ans1Arr.reduce((sum, cur) => sum + cur, 0)

console.log('ans1', ans1)


let ans2Arr = []
let idxRecord = []
for(let i=0; i<arr.length; i++) {
  const row = arr[i]
  let temp = ''
  for(let j=0; j<row.length; j++) {
    const s = arr[i][j]

    if (s === '*') {
      const checkList = [
        { i: i -1, j: j-1 },
        { i: i -1, j: j },
        { i: i -1, j: j+1 },
        { i: i, j: j-1 },
        { i: i, j: j+1 },
        { i: i +1, j: j-1 },
        { i: i +1, j: j },
        { i: i +1, j: j+1 },
      ]

      checkList.forEach((pos) => {
        if (/\d/.test(arr[pos.i][pos.j])) {
          const key = `${i}_${j}`
          const obj = { i: pos.i, j: pos.j }
          if (idxRecord[key]) {
            idxRecord[key].push(obj)
          } else {
            idxRecord[key] = [obj]
          }
        }
      })
    } else if (/\d/.test(s)) {
      temp += s
    }

    if ((j+1 === row.length || /\D/.test(arr[i][j+1]))) {
      if (temp.length) {
        ans2Arr.push({
          pos: Array(temp.length).fill('').map((_, idx) => ({ i, j: j - idx })),
          num: +temp
        })
      }
      temp = ''
    }
   
  }
}

const ans2 = Object.keys(idxRecord).map(key => {
  const posArr = idxRecord[key]
  return new Set(posArr.map(pos => ans2Arr.find(a => a.pos.some(p => p.i === pos.i && p.j === pos.j))?.num))
}).filter(s => s.size === 2).map(s => Array.from(s).reduce((sum, cur) => sum * cur, 1)).reduce((sum, cur) => sum + cur, 0)

console.log('ans2', ans2)