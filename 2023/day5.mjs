import { inputDemo, input } from './input/day5.mjs'

console.time('day5')
let [
  seeds,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
] = input.split('\n\n')

seeds = seeds.split(' ').map(Number).slice(1)

function createMap(str) {
  return str.split('\n').slice(1).map(line => line.split(' ').map(Number))
}

const seed2SoilMap = createMap(_1)
const soil2FertilizerMap = createMap(_2)
const fertilizer2WaterMap = createMap(_3)
const water2LightMap = createMap(_4)
const light2TemperatureMap = createMap(_5)
const temperature2HumidityMap = createMap(_6)
const humidity2LocationMap = createMap(_7)

const mapFlow = [
  seed2SoilMap,
  soil2FertilizerMap,
  fertilizer2WaterMap,
  water2LightMap,
  light2TemperatureMap,
  temperature2HumidityMap,
  humidity2LocationMap,
]

console.timeLog('day5')

let ans1 = Number.MAX_SAFE_INTEGER
seeds.forEach(seed => {
  for (const flow of mapFlow) {
    for(const map of flow) {
      const [target, source, range] = map
      if (source <= seed && seed <= source + range) {
        seed = target + (seed - source)
        break;
      }
    }
  }
  
  ans1 = Math.min(ans1, seed)
})

console.log('ans1', ans1)
console.timeLog('day5')

let ans2 = Number.MAX_SAFE_INTEGER
humidity2LocationMap.sort((a, b) => a[0] - b[0]).forEach(([target, source, range]) => {
  console.log(target, source)

  for(let i=0; i<source + range; i++) {

  }
})
// for(let i=0; i<seeds.length; i+=2) {
//   const start = seeds[i]
//   let length = seeds[i+1]
//   const end = start + length - 1
//   let j=start;
//   let step = 0
//   while(j <= end) {
//     let seed = j
//     for (const flow of mapFlow) {
//       for(const map of flow) {
//         const [target, source, range] = map

//         if (seed > source + range) {
//           continue
//         }

//         if (seed < source) {
//           if (seed + (end-j) >= source) {
//             step = Math.abs(source - seed)
//           }
//           continue
//         }

//         if (!step && seed + (end-j) > source + range) {
//           step = Math.abs((source + range) - seed + 1)
//         }
//         seed = target + (seed - source)

//         break;
//       }
//     }

//     ans2 = Math.min(ans2, seed)
//     // console.log(j + ' ==> ' + seed)
//     if (step) {
//       j+=step
//     } else {
//       j++
//     }
//     step = 0
//   }
//   // console.log('-------', j)
// }

console.log('ans2', ans2)
console.timeLog('day5')
