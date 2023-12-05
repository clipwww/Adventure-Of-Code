import { input } from "./input/day2.mjs";


const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
const ans1 = input.split('\n').map(line => {
  const [id, game] = line.split(': ')
  const state = game.split('; ').map(str => {
    let r=0,g=0,b=0;
    str.split(', ').forEach(cube => {
      const [num, color] = cube.split(' ')
      switch(color) {
        case 'red':
          r = +num
          break
        case 'green':
          g = +num
          break
        case 'blue':
          b = +num
          break
      }
    })
    return { r, g, b }
  }).every(({ r, g, b }) => r <= maxRed && g <= maxGreen && b <= maxBlue)

  return {
    id: +id.replace('Game ', ''),
    state,
  }
}).filter(item => item.state).reduce((sum, item) => sum + item.id, 0)

console.log('ans1', ans1)


const ans2 = input.split('\n').map(line => {
  const [id, game] = line.split(': ')
  
  const color = game.split('; ').map(str => {
    let r=0,g=0,b=0;
    str.split(', ').forEach(cube => {
      const [num, color] = cube.split(' ')
      switch(color) {
        case 'red':
          r = +num
          break
        case 'green':
          g = +num
          break
        case 'blue':
          b = +num
          break
      }
    })
    return { r, g, b }
  }).reduce((ret, cur) => {
    return { r: Math.max(ret.r, cur.r), g: Math.max(ret.g, cur.g), b: Math.max(ret.b, cur.b) }
  }, { r:0, g:0, b:0 })

  return color.r * color.g * color.b
}).reduce((sum, cur) => sum + cur, 0)

console.log('ans2', ans2)