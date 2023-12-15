import { inputDemo, input } from './input/day13.mjs';

console.time('init')
const inputArr = inputDemo.split('\n\n').map(mirror => mirror.split('\n'))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')
  const rows = []
  const cols = []
  for(let i=0;i<inputArr.length;i++) {
    const block = inputArr[i]
    for(let col=1;col<block[0].length;col++) {
      let j=0
      let ok = false
      while(block[0][col-j-1] && block[0][col+j]) {
        const preLine = Array(block.length).fill().map((_, idx) => block[idx][col-j-1]).join('')
        const line =  Array(block.length).fill().map((_, idx) => block[idx][col+j]).join('')
        ok = preLine === line
        if (!ok) {
          break 
        }
        j++
      }


      if (ok) {
        cols.push(col)
        break
      }
    }


    for(let row=1;row<block.length;row++) {
      let j=0
      let ok = false
      while(block[row-j-1] && block[row+j]) {
        const preLine = block[row-j-1]
        const line = block[row+j]
        ok = preLine === line
        if (!ok) {
          break 
        }
        j++
      }


      if (ok) {
        rows.push(row)
        break
      }
    }
  }

  // console.log(cols, rows)
  const ans1 = cols.reduce((sum, cur) => sum + cur, 0) + rows.reduce((sum, cur) => sum + (cur * 100), 0)

  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')


  console.log('part2 ans:', ans2)
  console.timeEnd('part2')
}

part2()