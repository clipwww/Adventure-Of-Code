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
    for (const map of flow) {
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


let ans2 = Infinity
for (const flow of mapFlow) {
  let i = 0;
  let seedLength = seeds.length
  while (i < seedLength) {
    const start = seeds[i]
    const end = start + seeds[i + 1] - 1
    let seed = start
    for (const map of flow) {
      const [target, source, range] = map
      const rangeEnd = source + range - 1
      if (source <= seed && end <= rangeEnd) {
        seed = target + (seed - source)
        seeds[i] = seed
        break;
      } else if (source <= seed && seed <= rangeEnd) {
        const over = end - rangeEnd
        seeds.push(seed + (seeds[i + 1] - over))
        seeds.push(over)
        
        seed = target + (seed - source)
        seeds[i] = seed
        seeds[i+1] -= over
        break;
      }
    }

    i += 2
    seedLength = seeds.length
  }
}

for(let i=0; i<seeds.length; i+=2) {
  ans2 = Math.min(ans2, seeds[i])
}

console.log('ans2', ans2)
console.timeLog('day5')
