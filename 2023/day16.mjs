import { inputDemo, input } from './input/day16.mjs';

console.time('init')
const inputArr = input.split('\n').map(line => line.split(''))
console.timeEnd('init')
// console.log(inputArr)

function part1() {
  console.time('part1')

  const recordSet = new Set()
  const copyArr = JSON.parse(JSON.stringify(inputArr))
  const lights = [
    { direct: 'right', pos: [0, 0] }
  ]

  while (lights.length) {
    lights.forEach((light, idx) => {
      let newPos = [...light.pos]

      if (newPos[0] < 0 || newPos[1] < 0 || newPos[0] > inputArr[0].length - 1 || newPos[1] > inputArr.length - 1 || copyArr[newPos[1]]?.[newPos[0]]?.match(/#/g)?.length >= 2000) {
        lights.splice(idx, 1)
        return
      }

      const str = inputArr[newPos[1]][newPos[0]]

      switch (true) {
        case (light.direct === 'right' || light.direct === 'left') && str === '|':
          lights[idx].direct = 'top'
          lights.push({
            direct: 'bottom',
            pos: [newPos[0], newPos[1] + 1],
          })
          break
        case (light.direct === 'top' || light.direct === 'bottom') && str === '-':
          lights[idx].direct = 'right'
          lights.push({
            direct: 'left',
            pos: [newPos[0] - 1, newPos[1]],
          })
          break
        case light.direct === 'right' && str === '\\':
          lights[idx].direct = 'bottom'
          break
        case light.direct === 'left' && str === '\\':
          lights[idx].direct = 'top'
          break
        case light.direct === 'top' && str === '\\':
          lights[idx].direct = 'left'
          break
        case light.direct === 'bottom' && str === '\\':
          lights[idx].direct = 'right'
          break
        case light.direct === 'right' && str === '/':
          lights[idx].direct = 'top'
          break
        case light.direct === 'left' && str === '/':
          lights[idx].direct = 'bottom'
          break
        case light.direct === 'bottom' && str === '/':
          lights[idx].direct = 'left'
          break
        case light.direct === 'top' && str === '/':
          lights[idx].direct = 'right'
          break
        case str === '.':
          copyArr[newPos[1]][newPos[0]] += '#'
          break
      }


      if (['\\', '/', '-', '|', '.'].includes(str)) {
        recordSet.add(`${newPos}`)
      }

      switch (light.direct) {
        case 'right':
          newPos = [light.pos[0] + 1, light.pos[1]]
          break;
        case 'left':
          newPos = [light.pos[0] - 1, light.pos[1]]
          break
        case 'top':
          newPos = [light.pos[0], light.pos[1] - 1]
          break
        case 'bottom':
          newPos = [light.pos[0], light.pos[1] + 1]
          break
      }


      lights[idx].pos = [...newPos]

    })
  }

  console.log('part1 ans:', recordSet.size)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  console.log('part2 ans:', '')
  console.timeEnd('part2')
}

part2()